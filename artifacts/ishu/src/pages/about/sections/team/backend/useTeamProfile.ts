export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  contact: {
    phone: string;
    email: string;
    whatsapp: string;
  };
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Ishu Kumar",
    role: "Founder & CEO",
    bio: "Focused on improving access to reliable exam updates, practical tools, and study resources for students across India.",
    contact: {
      phone: "+91 8986985813",
      email: "ishukryk@gmail.com",
      whatsapp: "918986985813",
    },
  },
];

export function useTeamProfile(): TeamMember[] {
  return TEAM_MEMBERS;
}
