// FILE: artifacts/ishu/src/pages/home/sections/faq/backend/useFaqItems.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useQuery } from "@tanstack/react-query";

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

function toFaqItems(raw: unknown): FaqItem[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const candidate = item as Record<string, unknown>;
      const id = Number(candidate.id);
      const question = typeof candidate.question === "string" ? candidate.question.trim() : "";
      const answer = typeof candidate.answer === "string" ? candidate.answer.trim() : "";

      if (!Number.isInteger(id) || !question || !answer) {
        return null;
      }

      return { id, question, answer } satisfies FaqItem;
    })
    .filter((item): item is FaqItem => item !== null);
}

/**
 * Reads FAQ entries from backend so this section uses database-backed content only.
 */
export function useFaqItems(): { items: FaqItem[]; isLoading: boolean; isError: boolean } {
  const { data, isLoading, isError } = useQuery<FaqItem[]>({
    queryKey: ["home", "faq-items"],
    queryFn: async () => {
      const response = await fetch("/api/home/sections/faq", { credentials: "include" });
      if (!response.ok) {
        throw new Error(`FAQ request failed: ${response.status}`);
      }

      const json = await response.json();
      const direct = toFaqItems(json);
      if (direct.length > 0) {
        return direct;
      }

      const wrapped = toFaqItems((json as Record<string, unknown>).items);
      if (wrapped.length > 0) {
        return wrapped;
      }

      return toFaqItems((json as Record<string, unknown>).data);
    },
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });

  const items = Array.isArray(data) ? data : [];
  return { items, isLoading, isError };
}
