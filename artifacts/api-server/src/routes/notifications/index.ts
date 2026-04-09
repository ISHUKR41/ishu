// @ts-nocheck
import { Router, type IRouter } from "express";
import { db, notificationSubscriptionsTable } from "@workspace/db";
import { SubscribeNotificationsBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/notifications/subscribe", async (req, res): Promise<void> => {
  const parsed = SubscribeNotificationsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [sub] = await db.insert(notificationSubscriptionsTable).values({
    whatsappNumber: parsed.data.whatsappNumber,
    name: parsed.data.name,
    categories: parsed.data.categories ?? [],
  }).returning();

  res.status(201).json({
    message: "Successfully subscribed to WhatsApp notifications!",
    subscriptionId: sub.id,
  });
});

export default router;
