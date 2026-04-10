// @ts-nocheck
// ============================================================================
// FILE: routes/about/index.ts
// PURPOSE: Backend route for About page sections requiring real API data.
// ============================================================================

import { Router, type IRouter } from "express";
import { db, usersTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/about/team", async (_req, res): Promise<void> => {
  try {
    const admins = await db
      .select({
        name: usersTable.name,
        email: usersTable.email,
        whatsappNumber: usersTable.whatsappNumber,
      })
      .from(usersTable)
      .where(eq(usersTable.role, "admin"))
      .orderBy(asc(usersTable.createdAt))
      .limit(6);

    const members = admins.map((admin) => {
      const whatsapp = admin.whatsappNumber || "8986985813";
      return {
        name: admin.name,
        role: "Platform Admin",
        bio: "Maintains verified exam updates, resources, and platform operations for students.",
        contact: {
          phone: `+91 ${whatsapp}`,
          email: admin.email,
          whatsapp,
        },
      };
    });

    if (members.length === 0) {
      res.json({
        members: [
          {
            name: "Ishu Kumar",
            role: "Founder & CEO",
            bio: "Focused on improving access to reliable exam updates, practical tools, and study resources for students across India.",
            contact: {
              phone: "+91 8986985813",
              email: "ishukryk@gmail.com",
              whatsapp: "918986985813",
            },
          },
        ],
      });
      return;
    }

    res.json({ members });
  } catch (error) {
    res.status(500).json({ error: "Failed to load team profiles" });
  }
});

export default router;
