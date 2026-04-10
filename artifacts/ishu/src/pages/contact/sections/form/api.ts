// FILE: artifacts/ishu/src/pages/contact/sections/form/api.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactFormResponse> {
  const baseUrl = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
  const res = await fetch(`${baseUrl}/api/contact/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message ?? "Failed to send message");
  }

  return res.json();
}
