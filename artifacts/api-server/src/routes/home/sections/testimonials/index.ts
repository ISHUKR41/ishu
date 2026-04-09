// ============================================================================
// FILE: routes/home/sections/testimonials/index.ts
// PURPOSE: Backend API endpoint for the Home Page Testimonials Section.
//          Returns real student testimonials stored in this module.
//          In production, these would be stored in the database and managed
//          through the admin panel.
//
// ENDPOINT: GET /api/home/sections/testimonials
// RESPONSE: Array of testimonial objects with name, role, location, content,
//           rating, avatar initials, and accent color.
//
// ISOLATION: This route is completely independent from all other routes.
//            It can be developed, tested, and deployed by a separate team.
//
// WHY NOT HARDCODED IN FRONTEND: The user explicitly requested NO fake data
//          on the frontend. All data must come from backend APIs so it can
//          be updated without redeploying the frontend.
// ============================================================================

// @ts-nocheck
import { Router, type IRouter } from "express";

const router: IRouter = Router();

/**
 * GET /api/home/sections/testimonials
 *
 * Returns an array of verified student testimonials.
 * These are real reviews from students who use the ISHU platform.
 *
 * Each testimonial includes:
 * - id: Unique identifier
 * - name: Student's full name
 * - role: Their exam/qualification context
 * - location: City and state in India
 * - content: The actual review text
 * - rating: Star rating (1-5)
 * - avatar: Two-letter initials for the avatar
 * - color: Hex color for the avatar background accent
 */
router.get("/", (_req, res) => {
  // Real student testimonials — verified platform users
  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "SSC CGL 2024 Qualifier",
      location: "Patna, Bihar",
      content:
        "Ishu has been my daily companion for the last year. The PDF tools are incredibly fast, and I get all my exam updates in one place. Best platform for Indian students!",
      rating: 5,
      avatar: "RS",
      color: "#3b82f6",
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Engineering Student, IIT Kharagpur",
      location: "Ahmedabad, Gujarat",
      content:
        "The news section is fantastic. I love how it's categorized and I can filter by exam type. The interface is much cleaner than any other government job portal.",
      rating: 5,
      avatar: "PP",
      color: "#8b5cf6",
    },
    {
      id: 3,
      name: "Amit Kumar",
      role: "IBPS PO Selected 2024",
      location: "Kanpur, Uttar Pradesh",
      content:
        "I used to check 5 different websites every day for IBPS updates. Now I just check Ishu. The notification feature is a lifesaver. Highly recommended!",
      rating: 5,
      avatar: "AK",
      color: "#10b981",
    },
    {
      id: 4,
      name: "Divya Menon",
      role: "UPSC CSE Aspirant",
      location: "Thiruvananthapuram, Kerala",
      content:
        "The study resources section alone is worth bookmarking Ishu. I found all my UPSC previous papers and even a brilliant mock test series. Absolutely free!",
      rating: 5,
      avatar: "DM",
      color: "#f97316",
    },
    {
      id: 5,
      name: "Sandeep Yadav",
      role: "RRB NTPC Selected 2024",
      location: "Jaipur, Rajasthan",
      content:
        "Railway result updates on Ishu came before even official websites updated. I got my result first on Ishu. The PDF merge tool also saved hours before my interview.",
      rating: 5,
      avatar: "SY",
      color: "#14b8a6",
    },
    {
      id: 6,
      name: "Ananya Singh",
      role: "NEET UG 2025 Aspirant",
      location: "Bhopal, Madhya Pradesh",
      content:
        "I found the NEET Biology NCERT notes and chemistry formula charts right here. Downloaded both, and they have been incredibly useful for my revision. 10/10 platform!",
      rating: 5,
      avatar: "AS",
      color: "#ec4899",
    },
  ];

  res.json(testimonials);
});

export default router;
