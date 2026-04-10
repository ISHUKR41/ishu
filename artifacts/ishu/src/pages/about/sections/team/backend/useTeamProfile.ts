// FILE: artifacts/ishu/src/pages/about/sections/team/backend/useTeamProfile.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useQuery } from "@tanstack/react-query";

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

function normalizeTeam(raw: unknown): TeamMember[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw
    .map((member) => {
      if (!member || typeof member !== "object") {
        return null;
      }

      const candidate = member as Record<string, unknown>;
      const contact = (candidate.contact as Record<string, unknown> | undefined) ?? {};

      const name = typeof candidate.name === "string" ? candidate.name.trim() : "";
      const role = typeof candidate.role === "string" ? candidate.role.trim() : "";
      const bio = typeof candidate.bio === "string" ? candidate.bio.trim() : "";
      const phone = typeof contact.phone === "string" ? contact.phone.trim() : "";
      const email = typeof contact.email === "string" ? contact.email.trim() : "";
      const whatsapp = typeof contact.whatsapp === "string" ? contact.whatsapp.trim() : "";

      if (!name || !role || !bio || !phone || !email || !whatsapp) {
        return null;
      }

      return {
        name,
        role,
        bio,
        contact: { phone, email, whatsapp },
      } satisfies TeamMember;
    })
    .filter((member): member is TeamMember => member !== null);
}

export function useTeamProfile(): {
  team: TeamMember[];
  isLoading: boolean;
  isError: boolean;
} {
  const { data, isLoading, isError } = useQuery<TeamMember[]>({
    queryKey: ["about", "team-members"],
    queryFn: async () => {
      const response = await fetch("/api/about/team", { credentials: "include" });
      if (!response.ok) {
        throw new Error(`Team request failed: ${response.status}`);
      }

      const json = await response.json();
      const direct = normalizeTeam(json);
      if (direct.length > 0) {
        return direct;
      }

      return normalizeTeam((json as Record<string, unknown>).members);
    },
    staleTime: 1000 * 60 * 15,
    retry: 1,
  });

  const team = Array.isArray(data) ? data : [];
  return { team, isLoading, isError };
}
