/**
 * Resources Page - Backend API Layer
 * Changes here do NOT affect any other page.
 */
export { useListResources } from "@workspace/api-client-react";

export const resourceCategories = [
  { slug: "all", label: "All Resources", icon: "FolderOpen" },
  { slug: "previous-papers", label: "Previous Year Papers", icon: "FileText" },
  { slug: "syllabus", label: "Syllabus", icon: "BookOpen" },
  { slug: "mock-tests", label: "Mock Tests", icon: "ClipboardCheck" },
  { slug: "study-notes", label: "Study Notes", icon: "PenTool" },
  { slug: "formula-sheets", label: "Formula Sheets", icon: "Calculator" },
  { slug: "ncert-solutions", label: "NCERT Solutions", icon: "Book" },
  { slug: "video-lectures", label: "Video Lectures", icon: "Play" },
  { slug: "current-affairs", label: "Current Affairs", icon: "Globe" },
] as const;
