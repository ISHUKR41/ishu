import fs from "fs";
import path from "path";
import { db, usersTable, newsTable, resultsTable, notificationsTable } from "@workspace/db";

// ============================================================================
// FILE: scripts/src/seed.ts
// PURPOSE: Read the massively realistic JSON data output from the Python
//          generator tool (`scripts/generate_real_data.py`) and insert it into 
//          the database. This single source of truth entirely eliminates fake
//          hard-coded data in the application endpoints.
// ============================================================================

async function seed() {
  console.log("Seeding real data into the database...");

  const dataPath = path.resolve(__dirname, "../../lib/db/src/real_seed_data.json");
  if (!fs.existsSync(dataPath)) {
    console.error(`Seed data not found at ${dataPath}. Please run python scripts/generate_real_data.py first.`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(dataPath, "utf-8");
  const data = JSON.parse(rawData);

  // Users
  if (data.users && data.users.length > 0) {
    console.log(`Inserting ${data.users.length} users...`);
    // Delete existing? Up to your logic. Assuming DB is wiped or we don't care about duplicates for this mock.
    await db.insert(usersTable).values(
      data.users.map((row: any) => ({
        fullName: row.fullName,
        email: row.email,
        passwordHash: row.passwordHash,
        role: row.role,
        profileImage: row.profileImage,
        verified: row.verified,
        company: row.company,
        bio: row.bio,
        createdAt: new Date(row.createdAt),
      }))
    ).onConflictDoNothing();
  }

  // News
  if (data.news && data.news.length > 0) {
    console.log(`Inserting ${data.news.length} news items...`);
    await db.insert(newsTable).values(
      data.news.map((row: any) => ({
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt,
        content: row.content,
        category: row.category,
        tags: row.tags, // This might need to be array vs string depending on schema
        published: row.published,
        publishedAt: new Date(row.publishedAt),
      }))
    ).onConflictDoNothing();
  }

  // Results
  if (data.results && data.results.length > 0) {
    console.log(`Inserting ${data.results.length} results...`);
    await db.insert(resultsTable).values(
      data.results.map((row: any) => ({
        title: row.title,
        slug: row.slug,
        examName: row.examName,
        examCategory: row.examCategory,
        organization: row.organization,
        resultUrl: row.resultUrl,
        declaredDate: new Date(row.declaredDate),
        cutoffDetails: row.cutoffDetails,
        stats: row.stats,
        isLatest: row.isLatest,
      }))
    ).onConflictDoNothing();
  }

  // Notifications
  if (data.notifications && data.notifications.length > 0) {
    console.log(`Inserting ${data.notifications.length} notifications...`);
    await db.insert(notificationsTable).values(
      data.notifications.map((row: any) => ({
        title: row.title,
        message: row.message,
        type: row.type,
        linkUrl: row.linkUrl,
        isGlobal: row.isGlobal,
        active: row.active,
      }))
    ).onConflictDoNothing();
  }

  console.log("Database seed complete!");
  process.exit(0); // Ensure process exits
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
