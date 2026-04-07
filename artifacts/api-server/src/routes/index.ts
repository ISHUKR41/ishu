import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import resultsRouter from "./results";
import newsRouter from "./news";
import toolsRouter from "./tools";
import blogsRouter from "./blogs";
import contactRouter from "./contact";
import notificationsRouter from "./notifications";
import adminRouter from "./admin";
import resourcesRouter from "./resources";

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
router.use(authRouter);
router.use(resultsRouter);
router.use(newsRouter);
router.use(toolsRouter);
router.use(blogsRouter);
router.use(contactRouter);
router.use(notificationsRouter);
router.use(adminRouter);
router.use(resourcesRouter);

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
