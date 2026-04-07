/**
 * 404 Not Found Page - Backend API Layer
 * Changes here do NOT affect any other page.
 */

export const notFoundData = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
  suggestions: [
    { label: "Go Home", href: "/", icon: "Home" },
    { label: "Browse Results", href: "/results", icon: "Trophy" },
    { label: "Explore Tools", href: "/tools", icon: "Wrench" },
    { label: "Read News", href: "/news", icon: "Newspaper" },
  ],
};
