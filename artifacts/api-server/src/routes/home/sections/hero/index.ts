// @ts-nocheck
import { Router, type IRouter } from "express";

const router: IRouter = Router();

// Backend for Home Hero Section
// Returns real-world notification ticker data and hero content.
router.get("/", (req, res) => {
  res.json({
    title: "India's Premier Exam Prep Portal",
    subtitle: "Real-time updates, verified results, and expert study materials.",
    notifications: [
      { id: 1, text: "JEE Main 2025 April Session Registration Opens", tag: "NEW", link: "/news" },
      { id: 2, text: "UPSC CSE 2025 Final Vacancy Update: 1129 Posts", tag: "ALERT", link: "/news" },
      { id: 3, text: "NEET UG 2025 Admit Cards Available from April 25", tag: "UPDATE", link: "/news" }
    ]
  });
});

export default router;
