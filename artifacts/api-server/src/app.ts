// ============================================================================
// FILE: app.ts — Express Application Configuration
// PURPOSE: Creates and configures the Express server with all middleware.
//          This is the central setup file for the ISHU API server.
//
// MIDDLEWARE STACK (in order of execution):
//   1. pino-http — Structured JSON logging for every request/response
//   2. CORS — Allows cross-origin requests from the frontend (Vite dev server)
//   3. JSON body parser — Parses JSON request bodies (50MB limit for file uploads)
//   4. URL-encoded parser — Parses form submissions
//   5. Cookie parser — Parses cookies for session management
//   6. Express session — Server-side session storage for authentication
//   7. API router — All routes mounted under /api prefix
//
// TECH STACK:
//   - Express.js 5 (Node.js HTTP framework)
//   - pino-http (high-performance structured logging)
//   - CORS (Cross-Origin Resource Sharing)
//   - express-session (session management)
//   - cookie-parser (cookie handling)
//
// SECURITY:
//   - Session secret from environment variable (falls back to default in dev)
//   - Secure cookies in production (HTTPS only)
//   - 50MB request size limit (for PDF file uploads)
//   - 1-week session expiry
// ============================================================================

// @ts-nocheck
import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser(process.env.SESSION_SECRET || "ishu-secret-key"));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "ishu-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

app.use("/api", router);

export default app;
