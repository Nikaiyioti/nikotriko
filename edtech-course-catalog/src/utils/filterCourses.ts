import type { Course, CourseFilters } from '../types/course';

export const defaultFilters: CourseFilters = {
  search: '',
  category: 'all',
  subcategory: 'all',
  levels: [],
  price: 'all',
  minRating: 0,
  maxDuration: 100,
  sort: 'popular',
};

/** მრავალდონიანი ფილტრაცია: ძიება → კატეგორია → ქვეკატეგორია → დონე → ფასი → რეიტინგი → ხანგრძლივობა → დალაგება */
export function filterCourses(courses: Course[], f: CourseFilters): Course[] {
  const q = f.search.trim().toLowerCase();

  const result = courses.filter((c) => {
    if (q) {
      const haystack = [c.title, c.description, c.instructor, ...c.tags].join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (f.category !== 'all' && c.category !== f.category) return false;
    if (f.subcategory !== 'all' && c.subcategory !== f.subcategory) return false;
    if (f.levels.length > 0 && !f.levels.includes(c.level)) return false;
    if (f.price === 'free' && c.price !== 0) return false;
    if (f.price === 'paid' && c.price === 0) return false;
    if (c.rating < f.minRating) return false;
    if (c.durationHours > f.maxDuration) return false;
    return true;
  });

  const sorted = [...result];
  switch (f.sort) {
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case 'priceAsc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'priceDesc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'duration':
      sorted.sort((a, b) => a.durationHours - b.durationHours);
      break;
    default:
      sorted.sort((a, b) => b.studentsCount - a.studentsCount);
  }
  return sorted;
}

export function getCategories(courses: Course[]): string[] {
  return [...new Set(courses.map((c) => c.category))];
}

export function getSubcategories(courses: Course[], category: string): string[] {
  const list = category === 'all' ? courses : courses.filter((c) => c.category === category);
  return [...new Set(list.map((c) => c.subcategory))];
}
