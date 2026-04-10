// ============================================================================
// FILE: index.ts
// MODULE: Core
// PURPOSE: This file provides the implementation for index.
// It is designed to be easy to understand, following the Hyper-Modular architecture.
// 
// Every component, page, section, and sub-section is strictly separated into frontend
// and backend codebases to ensure 100+ developers can work simultaneously without conflicts.
// ============================================================================

// @ts-nocheck
import { Router, type IRouter } from "express";
import healthRouter from "./health";
import resultsRouter from "./results";
import newsRouter from "./news";
import toolsRouter from "./tools";
import blogsRouter from "./blogs";
import contactRouter from "./contact/index";
import notificationsRouter from "./notifications";
import adminRouter from "./admin";
import resourcesRouter from "./resources";
import aboutRouter from "./about/index";

/**
 * HOME SECTION ROUTES (Hyper-Modular Feature-Sliced)
 * Each section of the homepage has its own strictly isolated backend routing
 * to comply with the architecture requirements.
 */
import homeHeroRouter from "./home/sections/hero";
import homeStatsRouter from "./home/sections/stats";
import homeTestimonialsRouter from "./home/sections/testimonials";
import homeExamCategoriesRouter from "../../../modules/Home/ExamCategories/backend";
import homeFeaturedResultsRouter from "../../../modules/Home/FeaturedResults/List/backend";
import homeFeaturedResultDetailRouter from "../../../modules/Home/FeaturedResults/Detail/backend";
import homeToolsShowcaseRouter from "../../../modules/Home/ToolsShowcase/backend";
import homeNewsPreviewRouter from "../../../modules/Home/NewsPreview/backend";
import homeBlogPreviewRouter from "../../../modules/Home/BlogPreview/backend";
import homeFaqRouter from "../../../modules/Home/FAQ/backend";
import homeNotificationCtaRouter from "../../../modules/Home/NotificationCTA/backend";
import homeStatsCountersRouter from "../../../modules/Home/StatsSection/Counters/backend";
import homeStatsChartRouter from "../../../modules/Home/StatsSection/Chart/backend";

// AUTH ROUTES (Modular Feature-Sliced)
import authLoginBackend from "../../../modules/Auth/Login/backend";
import authRegisterBackend from "../../../modules/Auth/Register/backend";
import authSessionBackend from "../../../modules/Auth/Session/backend";

// Results subcategory routes
import resultsUpscRouter from "./results/categories/upsc";
import resultsSscRouter from "./results/categories/ssc";
import resultsBankingRouter from "./results/categories/banking";
import resultsRailwayRouter from "./results/categories/railway";
import resultsDefenceRouter from "./results/categories/defence";
import resultsJeeRouter from "./results/categories/jee";
import resultsNeetRouter from "./results/categories/neet";
import resultsStatePscRouter from "./results/categories/state-psc";
import resultsTeachingRouter from "./results/categories/teaching";
import resultsPoliceRouter from "./results/categories/police";
import resultsEngineeringRouter from "./results/categories/engineering";
import resultsJudiciaryRouter from "./results/categories/judiciary";
import resultsNursingRouter from "./results/categories/nursing";

// Tools subcategory routes
import toolsPdfRouter from "./tools/categories/pdf";
import toolsAiRouter from "./tools/categories/ai";
import toolsImageRouter from "./tools/categories/image";
import toolsTextRouter from "./tools/categories/text";
import toolsConversionRouter from "./tools/categories/conversion";

// News subcategory routes
import newsUpscRouter from "./news/categories/upsc";
import newsSscRouter from "./news/categories/ssc";
import newsBankingRouter from "./news/categories/banking";
import newsRailwayRouter from "./news/categories/railway";
import newsScholarshipsRouter from "./news/categories/scholarships";
import newsAdmitCardsRouter from "./news/categories/admit-cards";
import newsEngineeringRouter from "./news/categories/engineering";
import newsResultsRouter from "./news/categories/results-news";
import newsEducationRouter from "./news/categories/education";
import newsTechnologyRouter from "./news/categories/technology";
import newsScienceRouter from "./news/categories/science";
import newsTeachingRouter from "./news/categories/teaching";
import newsMedicalRouter from "./news/categories/medical";
import newsPoliticsRouter from "./news/categories/politics";
import newsSportsRouter from "./news/categories/sports";
import newsBusinessRouter from "./news/categories/business";
import newsHealthRouter from "./news/categories/health";
import newsInternationalRouter from "./news/categories/international";
import newsNationalRouter from "./news/categories/national";
import newsStateRouter from "./news/categories/state";
import newsAgricultureRouter from "./news/categories/agriculture";
import newsEnvironmentRouter from "./news/categories/environment";
import newsLegalRouter from "./news/categories/legal";
import newsInnovationRouter from "./news/categories/innovation";
import newsStartupsRouter from "./news/categories/startups";
import newsGovtSchemesRouter from "./news/categories/govt-schemes";
import newsJeeRouter from "./news/categories/jee";
import newsNeetRouter from "./news/categories/neet";
import newsDefenceRouter from "./news/categories/defence";
import newsPoliceRouter from "./news/categories/police";

// Blogs subcategory routes
import blogsExamTipsRouter from "./blogs/categories/exam-tips";
import blogsCareerGuidanceRouter from "./blogs/categories/career-guidance";
import blogsSuccessStoriesRouter from "./blogs/categories/success-stories";
import blogsStudyStrategiesRouter from "./blogs/categories/study-strategies";

// Resources subcategory routes
import resourcesPreviousPapersRouter from "./resources/categories/previous-papers";
import resourcesSyllabusRouter from "./resources/categories/syllabus";
import resourcesMockTestsRouter from "./resources/categories/mock-tests";
import resourcesStudyNotesRouter from "./resources/categories/study-notes";
import resourcesFormulaSheetsRouter from "./resources/categories/formula-sheets";

const router: IRouter = Router();

// Core routes
router.use(healthRouter);
router.use(resultsRouter);
router.use(newsRouter);
router.use(toolsRouter);
router.use(blogsRouter);
router.use("/contact", contactRouter);
router.use(notificationsRouter);
router.use(adminRouter);
router.use(resourcesRouter);
router.use("/about", aboutRouter);

// Home Sections Feature-Sliced Routes -> /api/home/sections/:section
router.use("/home/sections/hero", homeHeroRouter);
router.use("/home/sections/stats", homeStatsRouter);
router.use("/home/sections/exam-categories", homeExamCategoriesRouter);
router.use("/home/sections/featured-results", homeFeaturedResultsRouter);
router.use("/home/sections/tools-showcase", homeToolsShowcaseRouter);
router.use("/home/sections/news-preview", homeNewsPreviewRouter);
router.use("/home/sections/blog-preview", homeBlogPreviewRouter);
router.use("/home/sections/faq", homeFaqRouter);
router.use("/home/sections/notification-cta", homeNotificationCtaRouter);
router.use("/home/sections/testimonials", homeTestimonialsRouter);

// Additional deeply isolated module endpoints (frontend/backend pair symmetry)
router.use("/modules/home/stats/counters", homeStatsCountersRouter);
router.use("/modules/home/stats/chart", homeStatsChartRouter);
router.use("/modules/home/featured-results/detail", homeFeaturedResultDetailRouter);

// Auth Modular Feature-Sliced Routes -> /api/auth/:action
router.use("/auth", authLoginBackend);
router.use("/auth", authRegisterBackend);
router.use("/auth", authSessionBackend);

// Results subcategory routes → /api/results/category/:slug
router.use("/results/category/upsc", resultsUpscRouter);
router.use("/results/category/ssc", resultsSscRouter);
router.use("/results/category/banking", resultsBankingRouter);
router.use("/results/category/railway", resultsRailwayRouter);
router.use("/results/category/defence", resultsDefenceRouter);
router.use("/results/category/jee", resultsJeeRouter);
router.use("/results/category/neet", resultsNeetRouter);
router.use("/results/category/state-psc", resultsStatePscRouter);
router.use("/results/category/teaching", resultsTeachingRouter);
router.use("/results/category/police", resultsPoliceRouter);
router.use("/results/category/engineering", resultsEngineeringRouter);
router.use("/results/category/judiciary", resultsJudiciaryRouter);
router.use("/results/category/nursing", resultsNursingRouter);

// Tools subcategory routes → /api/tools/category/:slug
router.use("/tools/category/pdf", toolsPdfRouter);
router.use("/tools/category/ai", toolsAiRouter);
router.use("/tools/category/image", toolsImageRouter);
router.use("/tools/category/text", toolsTextRouter);
router.use("/tools/category/conversion", toolsConversionRouter);

// News subcategory routes → /api/news/category/:slug
router.use("/news/category/upsc", newsUpscRouter);
router.use("/news/category/ssc", newsSscRouter);
router.use("/news/category/banking", newsBankingRouter);
router.use("/news/category/railway", newsRailwayRouter);
router.use("/news/category/scholarships", newsScholarshipsRouter);
router.use("/news/category/admit-cards", newsAdmitCardsRouter);
router.use("/news/category/engineering", newsEngineeringRouter);
router.use("/news/category/results", newsResultsRouter);
router.use("/news/category/education", newsEducationRouter);
router.use("/news/category/technology", newsTechnologyRouter);
router.use("/news/category/science", newsScienceRouter);
router.use("/news/category/teaching", newsTeachingRouter);
router.use("/news/category/medical", newsMedicalRouter);
router.use("/news/category/politics", newsPoliticsRouter);
router.use("/news/category/sports", newsSportsRouter);
router.use("/news/category/business", newsBusinessRouter);
router.use("/news/category/health", newsHealthRouter);
router.use("/news/category/international", newsInternationalRouter);
router.use("/news/category/national", newsNationalRouter);
router.use("/news/category/state", newsStateRouter);
router.use("/news/category/agriculture", newsAgricultureRouter);
router.use("/news/category/environment", newsEnvironmentRouter);
router.use("/news/category/legal", newsLegalRouter);
router.use("/news/category/innovation", newsInnovationRouter);
router.use("/news/category/startups", newsStartupsRouter);
router.use("/news/category/govt-schemes", newsGovtSchemesRouter);
router.use("/news/category/jee", newsJeeRouter);
router.use("/news/category/neet", newsNeetRouter);
router.use("/news/category/defence", newsDefenceRouter);
router.use("/news/category/police", newsPoliceRouter);

// Blogs subcategory routes → /api/blogs/category/:slug
router.use("/blogs/category/exam-tips", blogsExamTipsRouter);
router.use("/blogs/category/career-guidance", blogsCareerGuidanceRouter);
router.use("/blogs/category/success-stories", blogsSuccessStoriesRouter);
router.use("/blogs/category/study-strategies", blogsStudyStrategiesRouter);

// Resources subcategory routes → /api/resources/category/:slug
router.use("/resources/category/previous-papers", resourcesPreviousPapersRouter);
router.use("/resources/category/syllabus", resourcesSyllabusRouter);
router.use("/resources/category/mock-tests", resourcesMockTestsRouter);
router.use("/resources/category/study-notes", resourcesStudyNotesRouter);
router.use("/resources/category/formula-sheets", resourcesFormulaSheetsRouter);

export default router;
