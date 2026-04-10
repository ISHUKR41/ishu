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
import { Router, type IRouter } from "express";
import { db, usersTable, resultsTable, newsTable, blogsTable, contactsTable, notificationSubscriptionsTable } from "@workspace/db";
import { sql } from "drizzle-orm";
import { requireAdmin } from "../../middlewares/auth";
import { ListAdminUsersQueryParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/admin/stats", requireAdmin, async (req, res): Promise<void> => {
  const [users, results, news, blogs, contacts, subs] = await Promise.all([
    db.select({ count: sql<number>`count(*)::int` }).from(usersTable),
    db.select({ count: sql<number>`count(*)::int` }).from(resultsTable),
    db.select({ count: sql<number>`count(*)::int` }).from(newsTable),
    db.select({ count: sql<number>`count(*)::int` }).from(blogsTable),
    db.select({ count: sql<number>`count(*)::int` }).from(contactsTable),
    db.select({ count: sql<number>`count(*)::int` }).from(notificationSubscriptionsTable),
  ]);

  const recentContacts = await db.select().from(contactsTable)
    .orderBy(sql`${contactsTable.createdAt} DESC`)
    .limit(5);

  res.json({
    totalUsers: users[0]?.count ?? 0,
    totalResults: results[0]?.count ?? 0,
    totalNews: news[0]?.count ?? 0,
    totalBlogs: blogs[0]?.count ?? 0,
    totalContacts: contacts[0]?.count ?? 0,
    totalNotificationSubscribers: subs[0]?.count ?? 0,
    recentActivity: recentContacts.map(c => ({
      type: "contact",
      description: `New message from ${c.name}: ${c.subject}`,
      createdAt: c.createdAt,
    })),
  });
});

router.get("/admin/users", requireAdmin, async (req, res): Promise<void> => {
  const parsed = ListAdminUsersQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { page = 1, limit = 20 } = parsed.data;
  const offset = (page - 1) * limit;

  const [userList, countResult] = await Promise.all([
    db.select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      whatsappNumber: usersTable.whatsappNumber,
      role: usersTable.role,
      createdAt: usersTable.createdAt,
    }).from(usersTable)
      .limit(limit)
      .offset(offset)
      .orderBy(sql`${usersTable.createdAt} DESC`),
    db.select({ count: sql<number>`count(*)::int` }).from(usersTable),
  ]);

  const total = countResult[0]?.count ?? 0;

  res.json({
    users: userList,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
});

router.get("/admin/contacts", requireAdmin, async (_req, res): Promise<void> => {
  const contacts = await db.select().from(contactsTable).orderBy(sql`${contactsTable.createdAt} DESC`);
  res.json(contacts);
});

export default router;
