// ============================================================================
// FILE: modules/Blog/_shared/types.ts
// PURPOSE: TypeScript types for the Blog module — articles, categories, authors.
// ============================================================================

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  authorBio: string | null;
  authorAvatar: string | null;
  imageUrl: string | null;
  isFeatured: boolean;
  readTime: number;
  tags: string | null;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  count: number;
}

export interface PaginatedBlogResponse {
  data: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
