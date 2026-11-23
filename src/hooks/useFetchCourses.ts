import { useCallback, useEffect, useState } from 'react';
import type { Course } from '../types/course';

interface UseFetchCoursesResult {
  courses: Course[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Custom Hook: კურსების ჩამოტვირთვა fetch-ით.
 * იყენებს AbortController-ს, რომ კომპონენტის მოხსნისას მოთხოვნა გაუქმდეს.
 */
export function useFetchCourses(url: string): UseFetchCoursesResult {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`სერვერის შეცდომა: ${response.status}`);
        }
        const data: Course[] = await response.json();
        setCourses(data);
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setError((err as Error).message || 'კურსების ჩამოტვირთვა ვერ მოხერხდა');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [url, reloadKey]);

  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  return { courses, loading, error, refetch };
}
