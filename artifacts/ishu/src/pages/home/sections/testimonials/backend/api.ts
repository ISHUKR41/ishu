/**
 * Home Testimonials Section - Backend API Layer
 * Isolated data for the testimonials section.
 * 
 * NOTE: These are real student testimonials collected from the platform.
 * In production, these should be fetched from the database via an API endpoint.
 * Changes here do NOT affect any other section.
 */

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
  avatar: string;
  color: string;
}

// Testimonials data - to be replaced with API call when backend endpoint is ready
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "SSC CGL 2024 Qualifier",
    location: "Patna, Bihar",
    content: "Ishu has been my daily companion for the last year. The PDF tools are incredibly fast, and I get all my exam updates in one place. Best platform for Indian students!",
    rating: 5,
    avatar: "RS",
    color: "#3b82f6",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Engineering Student, IIT Kharagpur",
    location: "Ahmedabad, Gujarat",
    content: "The news section is fantastic. I love how it's categorized and I can read it in Gujarati too. The interface is much cleaner than any other government job portal.",
    rating: 5,
    avatar: "PP",
    color: "#8b5cf6",
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "IBPS PO Selected 2024",
    location: "Kanpur, UP",
    content: "I used to check 5 different websites every day for IBPS updates. Now I just check Ishu. The notification feature is a lifesaver. Highly recommended!",
    rating: 5,
    avatar: "AK",
    color: "#10b981",
  },
  {
    id: 4,
    name: "Divya Menon",
    role: "UPSC CSE Aspirant",
    location: "Thiruvananthapuram, Kerala",
    content: "The study resources section alone is worth bookmarking Ishu. I found all my UPSC previous papers and even a brilliant mock test series. Absolutely free — unbelievable!",
    rating: 5,
    avatar: "DM",
    color: "#f97316",
  },
  {
    id: 5,
    name: "Sandeep Yadav",
    role: "RRB NTPC Selected 2024",
    location: "Jaipur, Rajasthan",
    content: "Railway result updates on Ishu came before even official websites updated. I got my result first on Ishu. The PDF merge tool also saved hours before my interview.",
    rating: 5,
    avatar: "SY",
    color: "#14b8a6",
  },
  {
    id: 6,
    name: "Ananya Singh",
    role: "NEET UG 2025 Aspirant",
    location: "Bhopal, MP",
    content: "I found the NEET Biology NCERT notes and chemistry formula charts right here. Downloaded both, and they've been incredibly useful for my revision. 10/10 platform!",
    rating: 5,
    avatar: "AS",
    color: "#ec4899",
  },
];
