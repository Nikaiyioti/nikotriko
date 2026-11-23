export type CourseLevel = 'დამწყები' | 'საშუალო' | 'მოწინავე';

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  level: CourseLevel;
  instructor: string;
  durationHours: number;
  price: number; // 0 = უფასო
  rating: number;
  studentsCount: number;
  tags: string[];
  emoji: string;
  gradient: [string, string];
}

export type SortKey = 'popular' | 'rating' | 'priceAsc' | 'priceDesc' | 'duration';
export type PriceFilter = 'all' | 'free' | 'paid';

export interface CourseFilters {
  search: string;
  category: string; // 'all' ან კატეგორიის სახელი
  subcategory: string; // 'all' ან ქვეკატეგორია
  levels: CourseLevel[];
  price: PriceFilter;
  minRating: number;
  maxDuration: number; // საათები
  sort: SortKey;
}
