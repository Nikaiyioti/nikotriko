import { useMemo, useState } from 'react';
import type { Course, CourseFilters } from '../types/course';
import { useFetchCourses } from '../hooks/useFetchCourses';
import { defaultFilters, filterCourses, getCategories, getSubcategories } from '../utils/filterCourses';
import CourseCard from './CourseCard';
import FilterPanel from './FilterPanel';

const COURSES_URL = `${import.meta.env.BASE_URL}courses.json`;

export default function CourseCatalog() {
  const { courses, loading, error, refetch } = useFetchCourses(COURSES_URL);
  const [filters, setFilters] = useState<CourseFilters>(defaultFilters);
  const [selected, setSelected] = useState<Course | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = useMemo(() => getCategories(courses), [courses]);
  const subcategories = useMemo(() => getSubcategories(courses, filters.category), [courses, filters.category]);
  const visible = useMemo(() => filterCourses(courses, filters), [courses, filters]);

  const updateFilters = (patch: Partial<CourseFilters>) => setFilters((prev) => ({ ...prev, ...patch }));
  const resetFilters = () => setFilters(defaultFilters);

  return (
    <section className="course-catalog">
      <button
        type="button"
        onClick={() => setFiltersOpen((o) => !o)}
        className="course-catalog__toggle mb-4 w-full rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white"
      >
        {filtersOpen ? 'ფილტრების დამალვა' : 'ფილტრების ჩვენება'}
      </button>

      <div className="course-catalog__layout">
        <div className={`course-catalog__filters ${filtersOpen ? 'is-open' : ''}`}>
          <FilterPanel
            filters={filters}
            categories={categories}
            subcategories={subcategories}
            onChange={updateFilters}
            onReset={resetFilters}
          />
        </div>

        <div className="course-catalog__results">
          {loading && (
            <div className="grid gap-6 course-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-96 animate-pulse rounded-2xl bg-slate-200" />
              ))}
            </div>
          )}

          {error && (
            <div className="rounded-2xl bg-rose-50 p-6 text-center ring-1 ring-rose-200">
              <p className="mb-3 font-semibold text-rose-700">შეცდომა: {error}</p>
              <button type="button" onClick={refetch} className="rounded-lg bg-rose-600 px-4 py-2 text-white">
                თავიდან ცდა
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <p className="mb-4 text-sm text-slate-600">
                ნაპოვნია <strong className="text-slate-900">{visible.length}</strong> კურსი {courses.length}-დან
              </p>

              {visible.length === 0 ? (
                <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-slate-200">
                  <p className="text-4xl">🔍</p>
                  <p className="mt-3 font-semibold text-slate-800">კურსი ვერ მოიძებნა</p>
                  <p className="text-sm text-slate-500">სცადეთ ფილტრების შეცვლა.</p>
                  <button type="button" onClick={resetFilters} className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-white">
                    ფილტრების გასუფთავება
                  </button>
                </div>
              ) : (
                <div className="grid gap-6 course-grid">
                  {visible.map((course) => (
                    <CourseCard key={course.id} course={course} onSelect={setSelected} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-md rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="mb-2 text-xl font-bold">{selected.title}</h3>
            <p className="mb-4 text-slate-600">{selected.description}</p>
            <p className="mb-1 text-sm text-slate-500">ლექტორი: {selected.instructor}</p>
            <p className="mb-4 text-sm text-slate-500">
              {selected.category} › {selected.subcategory} · {selected.level} · {selected.durationHours} სთ
            </p>
            <button type="button" onClick={() => setSelected(null)} className="rounded-lg bg-brand-600 px-4 py-2 text-white">
              დახურვა
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
