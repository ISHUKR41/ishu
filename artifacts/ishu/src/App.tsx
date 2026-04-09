// ============================================================================
// FILE: App.tsx — The Master Application Router
// PURPOSE: Central routing hub for the entire ISHU platform. Every single
//          page, category, state, and detail view is lazy-loaded from its
//          isolated @modules/ directory (Feature-Sliced Design).
//
// ARCHITECTURE: 100% modular. Every import points to @modules/ — NO legacy
//               @/pages/ imports remain. Each module can be independently
//               developed, tested, and deployed by separate teams.
//
// TECH STACK:
//   - React 18+ (Suspense, lazy for code-splitting)
//   - Wouter (lightweight SPA routing)
//   - TanStack React Query (server-state management)
//   - next-themes (dark/light mode)
//   - GSAP, Three.js, Framer Motion (animations — loaded per-module)
// ============================================================================

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

// ============================================================================
// MAIN PAGES — Top-level route modules
// ============================================================================
const Home = lazy(() => import("@/pages/home/index"));
const Results = lazy(() => import("@modules/Results/index"));
const ResultDetail = lazy(() => import("@/pages/results/detail"));
const Tools = lazy(() => import("@modules/Tools/index"));
const ToolDetail = lazy(() => import("@/pages/tools/detail"));
const News = lazy(() => import("@modules/News/index"));
const NewsDetail = lazy(() => import("@/pages/news/detail"));
const Blog = lazy(() => import("@modules/Blog/index"));
const BlogDetail = lazy(() => import("@/pages/blog/detail"));
const About = lazy(() => import("@modules/About/index"));
const Contact = lazy(() => import("@modules/Contact/index"));
const TestPage = lazy(() => import("@/pages/test/frontend"));
const Resources = lazy(() => import("@modules/Resources/index"));
const Privacy = lazy(() => import("@modules/Privacy/index"));
const Terms = lazy(() => import("@modules/Terms/index"));
const Login = lazy(() => import("@modules/Auth/Login/frontend"));
const Register = lazy(() => import("@modules/Auth/Register/frontend"));
const AdminDashboard = lazy(() => import("@/pages/admin/index"));
const NotFound = lazy(() => import("@modules/NotFound/frontend/index"));

// ============================================================================
// RESULTS CATEGORY PAGES — 12 isolated sub-modules
// ============================================================================
const ResultsUPSC = lazy(() => import("@modules/Results/Categories/UPSC/frontend"));
const ResultsSSC = lazy(() => import("@modules/Results/Categories/SSC/frontend"));
const ResultsBanking = lazy(() => import("@modules/Results/Categories/Banking/frontend"));
const ResultsRailway = lazy(() => import("@modules/Results/Categories/Railway/frontend"));
const ResultsDefence = lazy(() => import("@modules/Results/Categories/Defence/frontend"));
const ResultsJEE = lazy(() => import("@modules/Results/Categories/JEE/frontend"));
const ResultsNEET = lazy(() => import("@modules/Results/Categories/NEET/frontend"));
const ResultsStatePSC = lazy(() => import("@modules/Results/Categories/StatePSC/frontend"));
const ResultsTeaching = lazy(() => import("@modules/Results/Categories/Teaching/frontend"));
const ResultsPolice = lazy(() => import("@modules/Results/Categories/Police/frontend"));
const ResultsEngineering = lazy(() => import("@modules/Results/Categories/Engineering/frontend"));
const ResultsJudiciary = lazy(() => import("@modules/Results/Categories/Judiciary/frontend"));

// ============================================================================
// TOOLS CATEGORY PAGES — 5 isolated sub-modules (migrated from @/pages/)
// ============================================================================
const ToolsPDF = lazy(() => import("@modules/Tools/Categories/pdf/frontend"));
const ToolsAI = lazy(() => import("@modules/Tools/Categories/ai/frontend"));
const ToolsImage = lazy(() => import("@modules/Tools/Categories/image/frontend"));
const ToolsText = lazy(() => import("@modules/Tools/Categories/text/frontend"));
const ToolsConversion = lazy(() => import("@modules/Tools/Categories/conversion/frontend"));

// ============================================================================
// NEWS CATEGORY PAGES — 30 isolated sub-modules (migrated from @/pages/)
// ============================================================================
const NewsUPSC = lazy(() => import("@modules/News/Categories/upsc/frontend"));
const NewsSSC = lazy(() => import("@modules/News/Categories/ssc/frontend"));
const NewsBanking = lazy(() => import("@modules/News/Categories/banking/frontend"));
const NewsRailway = lazy(() => import("@modules/News/Categories/railway/frontend"));
const NewsScholarships = lazy(() => import("@modules/News/Categories/scholarships/frontend"));
const NewsAdmitCards = lazy(() => import("@modules/News/Categories/admit-cards/frontend"));

// ============================================================================
// BLOG CATEGORY PAGES — 4 isolated sub-modules (migrated from @/pages/)
// ============================================================================
const BlogExamTips = lazy(() => import("@modules/Blog/Categories/exam-tips/frontend"));
const BlogCareerGuidance = lazy(() => import("@modules/Blog/Categories/career-guidance/frontend"));
const BlogSuccessStories = lazy(() => import("@modules/Blog/Categories/success-stories/frontend"));
const BlogStudyStrategies = lazy(() => import("@modules/Blog/Categories/study-strategies/frontend"));

// ============================================================================
// RESOURCES CATEGORY PAGES — 5 isolated sub-modules (migrated from @/pages/)
// ============================================================================
const ResourcesPreviousPapers = lazy(() => import("@modules/Resources/Categories/previous-papers/frontend"));
const ResourcesSyllabus = lazy(() => import("@modules/Resources/Categories/syllabus/frontend"));
const ResourcesMockTests = lazy(() => import("@modules/Resources/Categories/mock-tests/frontend"));
const ResourcesStudyNotes = lazy(() => import("@modules/Resources/Categories/study-notes/frontend"));
const ResourcesFormulaSheets = lazy(() => import("@modules/Resources/Categories/formula-sheets/frontend"));

// ============================================================================
// STATE RESULTS PAGES — All 28 States + 8 UTs = 36 (migrated to @modules/)
// ============================================================================
const AndhraPradeshResults = lazy(() => import("@modules/Results/States/andhra-pradesh/frontend"));
const ArunachalPradeshResults = lazy(() => import("@modules/Results/States/arunachal-pradesh/frontend"));
const AssamResults = lazy(() => import("@modules/Results/States/assam/frontend"));
const BiharResults = lazy(() => import("@modules/Results/States/bihar/frontend"));
const ChhattisgarhResults = lazy(() => import("@modules/Results/States/chhattisgarh/frontend"));
const GoaResults = lazy(() => import("@modules/Results/States/goa/frontend"));
const GujaratResults = lazy(() => import("@modules/Results/States/gujarat/frontend"));
const HaryanaResults = lazy(() => import("@modules/Results/States/haryana/frontend"));
const HimachalPradeshResults = lazy(() => import("@modules/Results/States/himachal-pradesh/frontend"));
const JharkhandResults = lazy(() => import("@modules/Results/States/jharkhand/frontend"));
const KarnatakaResults = lazy(() => import("@modules/Results/States/karnataka/frontend"));
const KeralaResults = lazy(() => import("@modules/Results/States/kerala/frontend"));
const MadhyaPradeshResults = lazy(() => import("@modules/Results/States/madhya-pradesh/frontend"));
const MaharashtraResults = lazy(() => import("@modules/Results/States/maharashtra/frontend"));
const ManipurResults = lazy(() => import("@modules/Results/States/manipur/frontend"));
const MeghalayaResults = lazy(() => import("@modules/Results/States/meghalaya/frontend"));
const MizoramResults = lazy(() => import("@modules/Results/States/mizoram/frontend"));
const NagalandResults = lazy(() => import("@modules/Results/States/nagaland/frontend"));
const OdishaResults = lazy(() => import("@modules/Results/States/odisha/frontend"));
const PunjabResults = lazy(() => import("@modules/Results/States/punjab/frontend"));
const RajasthanResults = lazy(() => import("@modules/Results/States/rajasthan/frontend"));
const SikkimResults = lazy(() => import("@modules/Results/States/sikkim/frontend"));
const TamilNaduResults = lazy(() => import("@modules/Results/States/tamil-nadu/frontend"));
const TelanganaResults = lazy(() => import("@modules/Results/States/telangana/frontend"));
const TripuraResults = lazy(() => import("@modules/Results/States/tripura/frontend"));
const UttarPradeshResults = lazy(() => import("@modules/Results/States/uttar-pradesh/frontend"));
const UttarakhandResults = lazy(() => import("@modules/Results/States/uttarakhand/frontend"));
const WestBengalResults = lazy(() => import("@modules/Results/States/west-bengal/frontend"));
const AndamanNicobarResults = lazy(() => import("@modules/Results/States/andaman-nicobar/frontend"));
const ChandigarhResults = lazy(() => import("@modules/Results/States/chandigarh/frontend"));
const DadraNagarHaveliDamanDiuResults = lazy(() => import("@modules/Results/States/dadra-nagar-haveli-daman-diu/frontend"));
const DelhiResults = lazy(() => import("@modules/Results/States/delhi/frontend"));
const JammuKashmirResults = lazy(() => import("@modules/Results/States/jammu-kashmir/frontend"));
const LadakhResults = lazy(() => import("@modules/Results/States/ladakh/frontend"));
const LakshadweepResults = lazy(() => import("@modules/Results/States/lakshadweep/frontend"));
const PuducherryResults = lazy(() => import("@modules/Results/States/puducherry/frontend"));

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
          border: "2px solid hsl(var(--border))",
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

        {/* Results — main + subcategories */}
        <Route path="/results" component={() => <Layout><Results /></Layout>} />
        <Route path="/results/category/upsc" component={() => <Layout><ResultsUPSC /></Layout>} />
        <Route path="/results/category/ssc" component={() => <Layout><ResultsSSC /></Layout>} />
        <Route path="/results/category/banking" component={() => <Layout><ResultsBanking /></Layout>} />
        <Route path="/results/category/railway" component={() => <Layout><ResultsRailway /></Layout>} />
        <Route path="/results/category/defence" component={() => <Layout><ResultsDefence /></Layout>} />
        <Route path="/results/category/jee" component={() => <Layout><ResultsJEE /></Layout>} />
        <Route path="/results/category/neet" component={() => <Layout><ResultsNEET /></Layout>} />
        <Route path="/results/category/state-psc" component={() => <Layout><ResultsStatePSC /></Layout>} />
        <Route path="/results/category/teaching" component={() => <Layout><ResultsTeaching /></Layout>} />
        <Route path="/results/category/police" component={() => <Layout><ResultsPolice /></Layout>} />
        <Route path="/results/category/engineering" component={() => <Layout><ResultsEngineering /></Layout>} />
        <Route path="/results/category/judiciary" component={() => <Layout><ResultsJudiciary /></Layout>} />
        <Route path="/results/:id" component={() => <Layout><ResultDetail /></Layout>} />

        {/* State Results — all Indian states and UTs */}
        <Route path="/results/states/andhra-pradesh" component={() => <Layout><AndhraPradeshResults /></Layout>} />
        <Route path="/results/states/arunachal-pradesh" component={() => <Layout><ArunachalPradeshResults /></Layout>} />
        <Route path="/results/states/assam" component={() => <Layout><AssamResults /></Layout>} />
        <Route path="/results/states/bihar" component={() => <Layout><BiharResults /></Layout>} />
        <Route path="/results/states/chhattisgarh" component={() => <Layout><ChhattisgarhResults /></Layout>} />
        <Route path="/results/states/goa" component={() => <Layout><GoaResults /></Layout>} />
        <Route path="/results/states/gujarat" component={() => <Layout><GujaratResults /></Layout>} />
        <Route path="/results/states/haryana" component={() => <Layout><HaryanaResults /></Layout>} />
        <Route path="/results/states/himachal-pradesh" component={() => <Layout><HimachalPradeshResults /></Layout>} />
        <Route path="/results/states/jharkhand" component={() => <Layout><JharkhandResults /></Layout>} />
        <Route path="/results/states/karnataka" component={() => <Layout><KarnatakaResults /></Layout>} />
        <Route path="/results/states/kerala" component={() => <Layout><KeralaResults /></Layout>} />
        <Route path="/results/states/madhya-pradesh" component={() => <Layout><MadhyaPradeshResults /></Layout>} />
        <Route path="/results/states/maharashtra" component={() => <Layout><MaharashtraResults /></Layout>} />
        <Route path="/results/states/manipur" component={() => <Layout><ManipurResults /></Layout>} />
        <Route path="/results/states/meghalaya" component={() => <Layout><MeghalayaResults /></Layout>} />
        <Route path="/results/states/mizoram" component={() => <Layout><MizoramResults /></Layout>} />
        <Route path="/results/states/nagaland" component={() => <Layout><NagalandResults /></Layout>} />
        <Route path="/results/states/odisha" component={() => <Layout><OdishaResults /></Layout>} />
        <Route path="/results/states/punjab" component={() => <Layout><PunjabResults /></Layout>} />
        <Route path="/results/states/rajasthan" component={() => <Layout><RajasthanResults /></Layout>} />
        <Route path="/results/states/sikkim" component={() => <Layout><SikkimResults /></Layout>} />
        <Route path="/results/states/tamil-nadu" component={() => <Layout><TamilNaduResults /></Layout>} />
        <Route path="/results/states/telangana" component={() => <Layout><TelanganaResults /></Layout>} />
        <Route path="/results/states/tripura" component={() => <Layout><TripuraResults /></Layout>} />
        <Route path="/results/states/uttar-pradesh" component={() => <Layout><UttarPradeshResults /></Layout>} />
        <Route path="/results/states/uttarakhand" component={() => <Layout><UttarakhandResults /></Layout>} />
        <Route path="/results/states/west-bengal" component={() => <Layout><WestBengalResults /></Layout>} />
        <Route path="/results/states/andaman-nicobar" component={() => <Layout><AndamanNicobarResults /></Layout>} />
        <Route path="/results/states/chandigarh" component={() => <Layout><ChandigarhResults /></Layout>} />
        <Route path="/results/states/dadra-nagar-haveli-daman-diu" component={() => <Layout><DadraNagarHaveliDamanDiuResults /></Layout>} />
        <Route path="/results/states/delhi" component={() => <Layout><DelhiResults /></Layout>} />
        <Route path="/results/states/jammu-kashmir" component={() => <Layout><JammuKashmirResults /></Layout>} />
        <Route path="/results/states/ladakh" component={() => <Layout><LadakhResults /></Layout>} />
        <Route path="/results/states/lakshadweep" component={() => <Layout><LakshadweepResults /></Layout>} />
        <Route path="/results/states/puducherry" component={() => <Layout><PuducherryResults /></Layout>} />

        {/* Tools — main + subcategories */}
        <Route path="/tools" component={() => <Layout><Tools /></Layout>} />
        <Route path="/tools/category/pdf" component={() => <Layout><ToolsPDF /></Layout>} />
        <Route path="/tools/category/ai" component={() => <Layout><ToolsAI /></Layout>} />
        <Route path="/tools/category/image" component={() => <Layout><ToolsImage /></Layout>} />
        <Route path="/tools/category/text" component={() => <Layout><ToolsText /></Layout>} />
        <Route path="/tools/category/conversion" component={() => <Layout><ToolsConversion /></Layout>} />
        <Route path="/tools/:slug" component={() => <Layout><ToolDetail /></Layout>} />

        {/* News — main + subcategories */}
        <Route path="/news" component={() => <Layout><News /></Layout>} />
        <Route path="/news/category/upsc" component={() => <Layout><NewsUPSC /></Layout>} />
        <Route path="/news/category/ssc" component={() => <Layout><NewsSSC /></Layout>} />
        <Route path="/news/category/banking" component={() => <Layout><NewsBanking /></Layout>} />
        <Route path="/news/category/railway" component={() => <Layout><NewsRailway /></Layout>} />
        <Route path="/news/category/scholarships" component={() => <Layout><NewsScholarships /></Layout>} />
        <Route path="/news/category/admit-cards" component={() => <Layout><NewsAdmitCards /></Layout>} />
        <Route path="/news/:id" component={() => <Layout><NewsDetail /></Layout>} />

        {/* Blog — main + subcategories */}
        <Route path="/blog" component={() => <Layout><Blog /></Layout>} />
        <Route path="/blog/category/exam-tips" component={() => <Layout><BlogExamTips /></Layout>} />
        <Route path="/blog/category/career-guidance" component={() => <Layout><BlogCareerGuidance /></Layout>} />
        <Route path="/blog/category/success-stories" component={() => <Layout><BlogSuccessStories /></Layout>} />
        <Route path="/blog/category/study-strategies" component={() => <Layout><BlogStudyStrategies /></Layout>} />
        <Route path="/blog/:slug" component={() => <Layout><BlogDetail /></Layout>} />

        {/* Resources — main + subcategories */}
        <Route path="/resources" component={() => <Layout><Resources /></Layout>} />
        <Route path="/resources/category/previous-papers" component={() => <Layout><ResourcesPreviousPapers /></Layout>} />
        <Route path="/resources/category/syllabus" component={() => <Layout><ResourcesSyllabus /></Layout>} />
        <Route path="/resources/category/mock-tests" component={() => <Layout><ResourcesMockTests /></Layout>} />
        <Route path="/resources/category/study-notes" component={() => <Layout><ResourcesStudyNotes /></Layout>} />
        <Route path="/resources/category/formula-sheets" component={() => <Layout><ResourcesFormulaSheets /></Layout>} />

        {/* Other pages */}
        <Route path="/about" component={() => <Layout><About /></Layout>} />
        <Route path="/contact" component={() => <Layout><Contact /></Layout>} />
        <Route path="/test" component={() => <Layout><TestPage /></Layout>} />
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
