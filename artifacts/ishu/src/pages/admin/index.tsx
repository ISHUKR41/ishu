import { useRoute } from "wouter";
import AdminRoute from "./AdminRoute";
import { useGetAdminStats, useListAdminContacts, useListAdminUsers } from "@workspace/api-client-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Users, FileText, Newspaper, BookOpen, MessageSquare, TrendingUp, Bell, Activity } from "lucide-react";

function StatsCard({ icon: Icon, label, value, color, bg }: { icon: any; label: string; value?: number | string; color: string; bg: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 flex items-center gap-4">
      <div className={`h-12 w-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-foreground">{value ?? "—"}</p>
      </div>
    </div>
  );
}

function Dashboard() {
  const { data: stats, isLoading } = useGetAdminStats();

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard icon={Users} label="Total Users" value={stats?.totalUsers} color="text-blue-400" bg="bg-blue-500/20" />
          <StatsCard icon={FileText} label="Total Results" value={stats?.totalResults} color="text-green-400" bg="bg-green-500/20" />
          <StatsCard icon={Newspaper} label="News Articles" value={stats?.totalNews} color="text-purple-400" bg="bg-purple-500/20" />
          <StatsCard icon={BookOpen} label="Blog Posts" value={stats?.totalBlogs} color="text-orange-400" bg="bg-orange-500/20" />
          <StatsCard icon={MessageSquare} label="Contact Messages" value={stats?.totalContacts} color="text-red-400" bg="bg-red-500/20" />
          <StatsCard icon={Bell} label="Subscribers" value={stats?.totalSubscribers} color="text-yellow-400" bg="bg-yellow-500/20" />
          <StatsCard icon={Activity} label="Active Results" value={stats?.activeResults} color="text-teal-400" bg="bg-teal-500/20" />
          <StatsCard icon={TrendingUp} label="Trending News" value={stats?.trendingNews} color="text-pink-400" bg="bg-pink-500/20" />
        </div>
      )}
    </div>
  );
}

function UsersTable() {
  const { data, isLoading } = useListAdminUsers({ page: 1, limit: 20 });
  const users = data?.users ?? [];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Users ({data?.total ?? 0})</h2>
      {isLoading ? <Skeleton className="h-64 rounded-xl" /> : (
        <div className="rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                <th className="text-left p-4 text-muted-foreground">Name</th>
                <th className="text-left p-4 text-muted-foreground">Email</th>
                <th className="text-left p-4 text-muted-foreground">Role</th>
                <th className="text-left p-4 text-muted-foreground">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4 text-muted-foreground">{user.email}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs ${user.role === "admin" ? "bg-orange-500/20 text-orange-400" : "bg-blue-500/20 text-blue-400"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground text-xs">{new Date(user.createdAt).toLocaleDateString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ContactsTable() {
  const { data, isLoading } = useListAdminContacts({ page: 1, limit: 20 });
  const contacts = data?.contacts ?? [];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Contact Messages ({data?.total ?? 0})</h2>
      {isLoading ? <Skeleton className="h-64 rounded-xl" /> : contacts.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-muted-foreground">No messages yet.</div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact: any) => (
            <div key={contact.id} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.email} {contact.phone && `· ${contact.phone}`}</p>
                </div>
                <span className="text-xs text-muted-foreground">{new Date(contact.createdAt).toLocaleDateString("en-IN")}</span>
              </div>
              {contact.subject && <p className="text-sm font-medium mb-1">{contact.subject}</p>}
              <p className="text-sm text-muted-foreground">{contact.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [matchDash] = useRoute("/admin");
  const [matchSection, params] = useRoute("/admin/:section");
  const section = matchSection ? params?.section : "dashboard";

  const SECTIONS: Record<string, () => JSX.Element> = {
    dashboard: Dashboard,
    users: UsersTable,
    contacts: ContactsTable,
  };

  const Content = SECTIONS[section ?? "dashboard"] ?? Dashboard;

  return (
    <AdminRoute>
      <PageMeta title="Admin Panel" description="Ishu admin dashboard" />
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Content />
      </motion.div>
    </AdminRoute>
  );
}
