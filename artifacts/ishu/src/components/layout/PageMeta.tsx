import { useEffect } from "react";

interface PageMetaProps {
  title: string;
  description?: string;
}

export function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    const defaultTitle = "Ishu - India's Premier Education & Tools Platform";
    document.title = title ? `Ishu | ${title}` : defaultTitle;

    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", description);
    }
    
    // Ensure favicon is set (this might be redundant if it's in index.html, but enforces rule)
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/svg+xml';
      link.href = '/favicon.svg';
      document.head.appendChild(link);
    } else {
      link.href = '/favicon.svg';
    }

    return () => {
      document.title = defaultTitle;
    };
  }, [title, description]);

  return null;
}
