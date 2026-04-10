import { drizzle as drizzleNodePostgres } from "drizzle-orm/node-postgres";
import pg from "pg";
import { newDb } from "pg-mem";
import * as schema from "./schema";

const { Pool } = pg;

type PatchedQuery = (...args: any[]) => any;

const inMemorySchemaSql = `
CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  whatsapp_number text,
  role text NOT NULL DEFAULT 'user',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS result_categories (
  id serial PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS results (
  id serial PRIMARY KEY,
  title text NOT NULL,
  short_description text NOT NULL,
  full_description text,
  category text NOT NULL,
  state text,
  status text NOT NULL DEFAULT 'coming_soon',
  total_posts integer,
  last_date date,
  exam_date date,
  required_documents text[] NOT NULL DEFAULT '{}',
  eligibility text,
  official_link text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS news_categories (
  id serial PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  color text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS news (
  id serial PRIMARY KEY,
  title text NOT NULL,
  short_description text NOT NULL,
  content text,
  category text NOT NULL,
  image_url text,
  language text NOT NULL DEFAULT 'en',
  author text,
  is_trending boolean NOT NULL DEFAULT false,
  view_count integer NOT NULL DEFAULT 0,
  related_news_ids integer[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tools (
  id serial PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  category text NOT NULL,
  icon text,
  is_new boolean NOT NULL DEFAULT false,
  usage_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_categories (
  id serial PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blogs (
  id serial PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text NOT NULL,
  content text,
  category text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  image_url text,
  author text NOT NULL,
  read_time integer NOT NULL DEFAULT 5,
  is_featured boolean NOT NULL DEFAULT false,
  view_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contacts (
  id serial PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notification_subscriptions (
  id serial PRIMARY KEY,
  whatsapp_number text NOT NULL,
  name text NOT NULL,
  categories text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notifications (
  id serial PRIMARY KEY,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'info',
  link_url text,
  is_global boolean NOT NULL DEFAULT true,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS faq (
  id serial PRIMARY KEY,
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  "order" integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
`;

function initializeInMemoryDatabase() {
  const toPostgresArrayLiteral = (value: unknown[]) => {
    const serializedValues = value.map((item) => {
      if (item === null || item === undefined) {
        return "NULL";
      }

      if (typeof item === "number" || typeof item === "boolean") {
        return String(item);
      }

      const escaped = String(item)
        .replace(/\\/g, "\\\\")
        .replace(/"/g, "\\\"");

      return `"${escaped}"`;
    });

    return `{${serializedValues.join(",")}}`;
  };

  const normalizeQueryValues = (values: unknown[]) =>
    values.map((item) => (Array.isArray(item) ? toPostgresArrayLiteral(item) : item));

  const patchArrayParamsForInMemoryPool = (pool: pg.Pool) => {
    const originalQuery = pool.query.bind(pool) as PatchedQuery;

    const sanitizeQueryConfig = (queryConfig: Record<string, unknown>) => {
      const normalizedQueryConfig = { ...queryConfig };

      // pg-mem adapter does not support pg type parser overrides.
      if ("types" in normalizedQueryConfig) {
        delete normalizedQueryConfig.types;
      }

      // Named prepared statements are fragile with pg-mem's socket adapter.
      if ("name" in normalizedQueryConfig) {
        delete normalizedQueryConfig.name;
      }

      return normalizedQueryConfig;
    };

    const adaptRowModeResult = (result: unknown, expectsArrayRows: boolean) => {
      if (!expectsArrayRows || !result || typeof result !== "object") {
        return result;
      }

      const typedResult = result as { rows?: unknown[]; fields?: unknown[] };
      if (!Array.isArray(typedResult.rows)) {
        return result;
      }

      if (typedResult.rows.length === 0 || Array.isArray(typedResult.rows[0])) {
        return result;
      }

      const normalizedRows = typedResult.rows.map((row) => {
        if (!row || typeof row !== "object") {
          return [];
        }
        return Object.values(row as Record<string, unknown>);
      });

      return {
        ...typedResult,
        rows: normalizedRows,
      };
    };

    (pool as pg.Pool & { query: PatchedQuery }).query = (...args: any[]) => {
      if (!args.length) {
        return originalQuery();
      }

      const [queryOrConfig, values, callback] = args;
      let expectsArrayRows = false;
      let normalizedQueryOrConfig: unknown = queryOrConfig;
      let normalizedValues: unknown = values;
      let normalizedCallback: unknown = callback;

      if (
        queryOrConfig &&
        typeof queryOrConfig === "object" &&
        !Array.isArray(queryOrConfig)
      ) {
        const queryConfig = sanitizeQueryConfig(queryOrConfig as Record<string, unknown>);
        expectsArrayRows = queryConfig.rowMode === "array";

        if ("rowMode" in queryConfig) {
          delete queryConfig.rowMode;
        }

        if (Array.isArray(queryConfig.values)) {
          queryConfig.values = normalizeQueryValues(queryConfig.values as unknown[]);
        }
        normalizedQueryOrConfig = queryConfig;
      }

      if (Array.isArray(normalizedValues)) {
        normalizedValues = normalizeQueryValues(normalizedValues);
      }

      if (typeof normalizedValues === "function") {
        const original = normalizedValues;
        normalizedValues = (error: unknown, result: unknown) => {
          (original as (error: unknown, result: unknown) => unknown)(
            error,
            adaptRowModeResult(result, expectsArrayRows),
          );
        };
      }

      if (typeof normalizedCallback === "function") {
        const original = normalizedCallback;
        normalizedCallback = (error: unknown, result: unknown) => {
          (original as (error: unknown, result: unknown) => unknown)(
            error,
            adaptRowModeResult(result, expectsArrayRows),
          );
        };
      }

      const hasSecondArg = normalizedValues !== undefined;
      const hasThirdArg = normalizedCallback !== undefined;

      const queryResult = hasThirdArg
        ? originalQuery(normalizedQueryOrConfig, normalizedValues, normalizedCallback)
        : hasSecondArg
          ? originalQuery(normalizedQueryOrConfig, normalizedValues)
          : originalQuery(normalizedQueryOrConfig);

      if (queryResult && typeof (queryResult as Promise<unknown>).then === "function") {
        return (queryResult as Promise<unknown>).then((result) =>
          adaptRowModeResult(result, expectsArrayRows),
        );
      }

      return queryResult;
    };
  };

  const inMemoryDb = newDb({ autoCreateForeignKeyIndices: true });
  inMemoryDb.public.none(inMemorySchemaSql);
  const inMemoryPg = inMemoryDb.adapters.createPg();
  const InMemoryPool = inMemoryPg.Pool as typeof Pool;
  const pool = new InMemoryPool();
  pool.on("error", (error) => {
    console.error("[db] in-memory pool client error", error);
  });
  patchArrayParamsForInMemoryPool(pool as unknown as pg.Pool);
  const db = drizzleNodePostgres(pool as unknown as pg.Pool, { schema });

  return { pool: pool as unknown as pg.Pool, db };
}

function initializePostgresDatabase(connectionString: string) {
  const pool = new Pool({ connectionString });
  pool.on("error", (error) => {
    console.error("[db] postgres pool client error", error);
  });
  const db = drizzleNodePostgres(pool, { schema });

  return { pool, db };
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString && process.env.NODE_ENV === "production") {
  throw new Error(
    "DATABASE_URL must be set in production. Did you forget to provision a database?",
  );
}

if (!connectionString) {
  console.warn(
    "[db] DATABASE_URL is not set. Falling back to in-memory PostgreSQL for local development.",
  );
}

const initializedDatabase = connectionString
  ? initializePostgresDatabase(connectionString)
  : await initializeInMemoryDatabase();

export const pool = initializedDatabase.pool;
export const db = initializedDatabase.db;
export const isInMemoryDatabase = !connectionString;

export * from "./schema";
