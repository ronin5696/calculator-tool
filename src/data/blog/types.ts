export interface ArticleData {
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  authorRole: string;
  content: string;
}

export interface ArticleCard {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  emoji: string;
  featured: boolean;
}
