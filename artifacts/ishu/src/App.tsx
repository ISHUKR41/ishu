import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import Home from "@/pages/home/index";
import Results from "@/pages/results/index";
import ResultDetail from "@/pages/results/detail";
import Tools from "@/pages/tools/index";
import ToolDetail from "@/pages/tools/detail";
import News from "@/pages/news/index";
import NewsDetail from "@/pages/news/detail";
import Blog from "@/pages/blog/index";
import BlogDetail from "@/pages/blog/detail";
import About from "@/pages/about/index";
import Contact from "@/pages/contact/index";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import AdminDashboard from "@/pages/admin/index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

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
      <Route path="/auth/login" component={() => <AuthLayout><Login /></AuthLayout>} />
      <Route path="/auth/register" component={() => <AuthLayout><Register /></AuthLayout>} />
      <Route path="/admin" component={() => <AdminDashboard />} />
      <Route path="/admin/:section" component={() => <AdminDashboard />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AuthProvider>
            <TooltipProvider>
              <Router />
              <Toaster />
            </TooltipProvider>
          </AuthProvider>
        </WouterRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
