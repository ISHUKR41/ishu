import { Suspense, lazy } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";

const Home = lazy(() => import("@/pages/home/index"));
const Results = lazy(() => import("@/pages/results/index"));
const ResultDetail = lazy(() => import("@/pages/results/detail"));
const Tools = lazy(() => import("@/pages/tools/index"));
const ToolDetail = lazy(() => import("@/pages/tools/detail"));
const News = lazy(() => import("@/pages/news/index"));
const NewsDetail = lazy(() => import("@/pages/news/detail"));
const Blog = lazy(() => import("@/pages/blog/index"));
const BlogDetail = lazy(() => import("@/pages/blog/detail"));
const About = lazy(() => import("@/pages/about/index"));
const Contact = lazy(() => import("@/pages/contact/index"));
const Resources = lazy(() => import("@/pages/resources/index"));
const Privacy = lazy(() => import("@/pages/privacy/index"));
const Terms = lazy(() => import("@/pages/terms/index"));
const Login = lazy(() => import("@/pages/auth/login"));
const Register = lazy(() => import("@/pages/auth/register"));
const AdminDashboard = lazy(() => import("@/pages/admin/index"));
const NotFound = lazy(() => import("@/pages/not-found/index"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function PageLoader() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.4,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          border: "2px solid rgba(255,255,255,0.1)",
          borderTopColor: "#3b82f6",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }}
      />
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">{children}</main>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={() => <Layout><Home /></Layout>} />
        <Route path="/results" component={() => <Layout><Results /></Layout>} />
        <Route path="/results/:id" component={() => <Layout><ResultDetail /></Layout>} />
        <Route path="/tools" component={() => <Layout><Tools /></Layout>} />
        <Route path="/tools/:slug" component={() => <Layout><ToolDetail /></Layout>} />
        <Route path="/news" component={() => <Layout><News /></Layout>} />
        <Route path="/news/:id" component={() => <Layout><NewsDetail /></Layout>} />
        <Route path="/blog" component={() => <Layout><Blog /></Layout>} />
        <Route path="/blog/:slug" component={() => <Layout><BlogDetail /></Layout>} />
        <Route path="/about" component={() => <Layout><About /></Layout>} />
        <Route path="/contact" component={() => <Layout><Contact /></Layout>} />
        <Route path="/resources" component={() => <Layout><Resources /></Layout>} />
        <Route path="/privacy" component={() => <Layout><Privacy /></Layout>} />
        <Route path="/terms" component={() => <Layout><Terms /></Layout>} />
        <Route path="/auth/login" component={() => <AuthLayout><Login /></AuthLayout>} />
        <Route path="/auth/register" component={() => <AuthLayout><Register /></AuthLayout>} />
        <Route path="/admin" component={() => <AdminDashboard />} />
        <Route path="/admin/:section" component={() => <AdminDashboard />} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AuthProvider>
            <TooltipProvider>
              <SmoothScrollProvider>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <Router />
                <Toaster />
              </SmoothScrollProvider>
            </TooltipProvider>
          </AuthProvider>
        </WouterRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
