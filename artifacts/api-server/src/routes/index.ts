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

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(resultsRouter);
router.use(newsRouter);
router.use(toolsRouter);
router.use(blogsRouter);
router.use(contactRouter);
router.use(notificationsRouter);
router.use(adminRouter);

export default router;
