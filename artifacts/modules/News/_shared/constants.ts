// ============================================================================
// FILE: artifacts/modules/News/_shared/constants.ts
// MODULE: News
// PURPOSE: Central shared constants for News module pagination and categories.
//          Used by isolated News sections to keep behavior consistent.
// ============================================================================

export const MODULE_NAME = "News";

export const NEWS_PER_PAGE = 12;

export type NewsCategory = {
  id: string;
  name: string;
  slug: string;
};

export const NEWS_CATEGORIES: NewsCategory[] = [
  { id: "1", name: "Exam Updates", slug: "exam-updates" },
  { id: "2", name: "Result Announcements", slug: "results" },
  { id: "3", name: "Recruitment", slug: "recruitment" },
  { id: "4", name: "Admit Cards", slug: "admit-cards" },
];
