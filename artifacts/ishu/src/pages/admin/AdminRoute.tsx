import { useAuth } from "@/hooks/useAuth";
import { Link, useLocation } from "wouter";
import { PageMeta } from "@/components/layout/PageMeta";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAdmin } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user || !isAdmin) {
    setLocation("/");
    return null;
  }

  return (
    <>
      <PageMeta title="Admin Dashboard" />
      <div className="flex min-h-screen">
        <aside className="w-64 bg-card border-r border-border p-4 flex flex-col gap-4">
          <Link href="/admin" className="font-bold text-xl mb-4">Admin Panel</Link>
          <Link href="/admin" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
          <Link href="/admin/users" className="text-muted-foreground hover:text-foreground">Users</Link>
          <Link href="/admin/results" className="text-muted-foreground hover:text-foreground">Results</Link>
          <Link href="/admin/news" className="text-muted-foreground hover:text-foreground">News</Link>
          <Link href="/admin/blogs" className="text-muted-foreground hover:text-foreground">Blogs</Link>
          <Link href="/admin/contacts" className="text-muted-foreground hover:text-foreground">Contacts</Link>
        </aside>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </>
  );
}
