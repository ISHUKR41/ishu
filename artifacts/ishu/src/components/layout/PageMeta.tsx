import { useEffect } from "react";

interface PageMetaProps {
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  type?: "website" | "article";
}

function setOrCreateMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function PageMeta({
  title,
  description = "India's #1 Education & Government Jobs Platform — exam results, 100+ PDF tools, educational news, and career guidance.",
  keywords,
  ogImage = "https://ishu.in/og-image.jpg",
  canonical,
  type = "website",
}: PageMetaProps) {
  useEffect(() => {
    const siteTitle = "Ishu";
    const fullTitle = title.includes("Ishu") ? title : `${title} | ${siteTitle}`;

    document.title = fullTitle;

    setOrCreateMeta("description", description);
    setOrCreateMeta("robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");

    if (keywords) setOrCreateMeta("keywords", keywords);

    setOrCreateMeta("og:title", fullTitle, "property");
    setOrCreateMeta("og:description", description, "property");
    setOrCreateMeta("og:type", type, "property");
    setOrCreateMeta("og:image", ogImage, "property");
    setOrCreateMeta("og:site_name", siteTitle, "property");
    setOrCreateMeta("og:locale", "en_IN", "property");

    setOrCreateMeta("twitter:card", "summary_large_image");
    setOrCreateMeta("twitter:title", fullTitle);
    setOrCreateMeta("twitter:description", description);
    setOrCreateMeta("twitter:image", ogImage);

    if (canonical) {
      let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    let iconLink = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!iconLink) {
      iconLink = document.createElement("link");
      iconLink.rel = "icon";
      iconLink.type = "image/svg+xml";
      iconLink.href = "/favicon.svg";
      document.head.appendChild(iconLink);
    }

    return () => {
      document.title = `${siteTitle} - India's Premier Education & Tools Platform`;
    };
  }, [title, description, keywords, ogImage, canonical, type]);

  return null;
}
