// ============================================================================
// FILE: index.ts
// MODULE: Core
// PURPOSE: This file provides the implementation for index.
// It is designed to be easy to understand, following the Hyper-Modular architecture.
// 
// Every component, page, section, and sub-section is strictly separated into frontend
// and backend codebases to ensure 100+ developers can work simultaneously without conflicts.
// ============================================================================

// @ts-nocheck
import app from "./app";
import { logger } from "./lib/logger";
import { seedDatabase } from "./lib/seed";

const rawPort = process.env["PORT"];
const port = rawPort ? Number(rawPort) : 5000;

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const server = app.listen(port);

server.once("listening", async () => {
  logger.info({ port }, "Server listening");

  try {
    await seedDatabase();
    logger.info("Database seeded");
  } catch (err) {
    logger.error({ err }, "Database seed failed");
    process.exit(1);
  }
});

server.once("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    logger.error(
      { port },
      "Server port is already in use. Stop the existing process or set PORT to a free value.",
    );
  } else {
    logger.error({ err, port }, "Error listening on port");
  }

  process.exit(1);
});
