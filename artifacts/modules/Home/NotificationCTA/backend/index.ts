// ============================================================================
// FILE: artifacts/modules/Home/NotificationCTA/backend/index.ts
// PURPOSE: Dedicated backend module for the Home NotificationCTA section.
// ============================================================================

import { Router, type IRouter, Request, Response } from "express";
import { and, count, eq } from "drizzle-orm";
import { db } from "../../../../../lib/db/src";
import {
  notificationsTable,
  notificationSubscriptionsTable,
} from "../../../../../lib/db/src/schema";

const router: IRouter = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const [subscribersRow, activeNotificationsRow] = await Promise.all([
      db.select({ value: count() }).from(notificationSubscriptionsTable),
      db
        .select({ value: count() })
        .from(notificationsTable)
        .where(
          and(eq(notificationsTable.active, true), eq(notificationsTable.isGlobal, true)),
        ),
    ]);

    res.json({
      success: true,
      data: {
        activeSubscribers: subscribersRow[0]?.value ?? 0,
        activeGlobalNotifications: activeNotificationsRow[0]?.value ?? 0,
      },
    });
  } catch (err) {
    console.error("Error fetching data for NotificationCTA:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
