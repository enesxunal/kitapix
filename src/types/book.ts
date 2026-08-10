export type Book = {
  id: string;
  slug: string;
  title: string;
  author: string;
  publisher: string;
  cover: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  badge?: string;
};
