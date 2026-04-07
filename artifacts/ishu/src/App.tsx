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

// Results category pages
const ResultsUPSC = lazy(() => import("@/pages/results/categories/upsc"));
const ResultsSSC = lazy(() => import("@/pages/results/categories/ssc"));
const ResultsBanking = lazy(() => import("@/pages/results/categories/banking"));
const ResultsRailway = lazy(() => import("@/pages/results/categories/railway"));
const ResultsDefence = lazy(() => import("@/pages/results/categories/defence"));
const ResultsJEE = lazy(() => import("@/pages/results/categories/jee"));
const ResultsNEET = lazy(() => import("@/pages/results/categories/neet"));
const ResultsStatePSC = lazy(() => import("@/pages/results/categories/state-psc"));
const ResultsTeaching = lazy(() => import("@/pages/results/categories/teaching"));
const ResultsPolice = lazy(() => import("@/pages/results/categories/police"));
const ResultsEngineering = lazy(() => import("@/pages/results/categories/engineering"));
const ResultsJudiciary = lazy(() => import("@/pages/results/categories/judiciary"));

// Tools category pages
const ToolsPDF = lazy(() => import("@/pages/tools/categories/pdf"));
const ToolsAI = lazy(() => import("@/pages/tools/categories/ai"));
const ToolsImage = lazy(() => import("@/pages/tools/categories/image"));
const ToolsText = lazy(() => import("@/pages/tools/categories/text"));
const ToolsConversion = lazy(() => import("@/pages/tools/categories/conversion"));

// News category pages
const NewsUPSC = lazy(() => import("@/pages/news/categories/upsc"));
const NewsSSC = lazy(() => import("@/pages/news/categories/ssc"));
const NewsBanking = lazy(() => import("@/pages/news/categories/banking"));
const NewsRailway = lazy(() => import("@/pages/news/categories/railway"));
const NewsScholarships = lazy(() => import("@/pages/news/categories/scholarships"));
const NewsAdmitCards = lazy(() => import("@/pages/news/categories/admit-cards"));

// Blog category pages
const BlogExamTips = lazy(() => import("@/pages/blogs/categories/exam-tips"));
const BlogCareerGuidance = lazy(() => import("@/pages/blogs/categories/career-guidance"));
const BlogSuccessStories = lazy(() => import("@/pages/blogs/categories/success-stories"));
const BlogStudyStrategies = lazy(() => import("@/pages/blogs/categories/study-strategies"));

// Resources category pages
const ResourcesPreviousPapers = lazy(() => import("@/pages/resources/categories/previous-papers"));
const ResourcesSyllabus = lazy(() => import("@/pages/resources/categories/syllabus"));
const ResourcesMockTests = lazy(() => import("@/pages/resources/categories/mock-tests"));
const ResourcesStudyNotes = lazy(() => import("@/pages/resources/categories/study-notes"));
const ResourcesFormulaSheets = lazy(() => import("@/pages/resources/categories/formula-sheets"));

// State Results Pages - All Indian States and UTs
const AndhraPradeshResults = lazy(() => import("@/pages/results/states/andhra-pradesh/frontend"));
const ArunachalPradeshResults = lazy(() => import("@/pages/results/states/arunachal-pradesh/frontend"));
const AssamResults = lazy(() => import("@/pages/results/states/assam/frontend"));
const BiharResults = lazy(() => import("@/pages/results/states/bihar/frontend"));
const ChhattisgarhResults = lazy(() => import("@/pages/results/states/chhattisgarh/frontend"));
const GoaResults = lazy(() => import("@/pages/results/states/goa/frontend"));
const GujaratResults = lazy(() => import("@/pages/results/states/gujarat/frontend"));
const HaryanaResults = lazy(() => import("@/pages/results/states/haryana/frontend"));
const HimachalPradeshResults = lazy(() => import("@/pages/results/states/himachal-pradesh/frontend"));
const JharkhandResults = lazy(() => import("@/pages/results/states/jharkhand/frontend"));
const KarnatakaResults = lazy(() => import("@/pages/results/states/karnataka/frontend"));
const KeralaResults = lazy(() => import("@/pages/results/states/kerala/frontend"));
const MadhyaPradeshResults = lazy(() => import("@/pages/results/states/madhya-pradesh/frontend"));
const MaharashtraResults = lazy(() => import("@/pages/results/states/maharashtra/frontend"));
const ManipurResults = lazy(() => import("@/pages/results/states/manipur/frontend"));
const MeghalayaResults = lazy(() => import("@/pages/results/states/meghalaya/frontend"));
const MizoramResults = lazy(() => import("@/pages/results/states/mizoram/frontend"));
const NagalandResults = lazy(() => import("@/pages/results/states/nagaland/frontend"));
const OdishaResults = lazy(() => import("@/pages/results/states/odisha/frontend"));
const PunjabResults = lazy(() => import("@/pages/results/states/punjab/frontend"));
const RajasthanResults = lazy(() => import("@/pages/results/states/rajasthan/frontend"));
const SikkimResults = lazy(() => import("@/pages/results/states/sikkim/frontend"));
const TamilNaduResults = lazy(() => import("@/pages/results/states/tamil-nadu/frontend"));
const TelanganaResults = lazy(() => import("@/pages/results/states/telangana/frontend"));
const TripuraResults = lazy(() => import("@/pages/results/states/tripura/frontend"));
const UttarPradeshResults = lazy(() => import("@/pages/results/states/uttar-pradesh/frontend"));
const UttarakhandResults = lazy(() => import("@/pages/results/states/uttarakhand/frontend"));
const WestBengalResults = lazy(() => import("@/pages/results/states/west-bengal/frontend"));
const AndamanNicobarResults = lazy(() => import("@/pages/results/states/andaman-nicobar/frontend"));
const ChandigarhResults = lazy(() => import("@/pages/results/states/chandigarh/frontend"));
const DadraNagarHaveliDamanDiuResults = lazy(() => import("@/pages/results/states/dadra-nagar-haveli-daman-diu/frontend"));
const DelhiResults = lazy(() => import("@/pages/results/states/delhi/frontend"));
const JammuKashmirResults = lazy(() => import("@/pages/results/states/jammu-kashmir/frontend"));
const LadakhResults = lazy(() => import("@/pages/results/states/ladakh/frontend"));
const LakshadweepResults = lazy(() => import("@/pages/results/states/lakshadweep/frontend"));
const PuducherryResults = lazy(() => import("@/pages/results/states/puducherry/frontend"));

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
