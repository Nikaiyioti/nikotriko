import type { Course } from '../types/course';

interface CourseCardProps {
  course: Course;
  onSelect?: (course: Course) => void;
}

const levelStyles: Record<Course['level'], string> = {
  დამწყები: 'bg-emerald-100 text-emerald-700',
  საშუალო: 'bg-amber-100 text-amber-700',
  მოწინავე: 'bg-rose-100 text-rose-700',
};

export default function CourseCard({ course, onSelect }: CourseCardProps) {
  const { title, description, instructor, level, durationHours, price, rating, studentsCount, tags, emoji, gradient, category } = course;

  return (
    <article className="course-card group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
      <div
        className="course-card__thumb flex h-36 items-center justify-center text-5xl"
        style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
        aria-hidden="true"
      >
        {emoji}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{category}</span>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${levelStyles[level]}`}>{level}</span>
        </div>

        <h3 className="text-lg font-bold leading-snug text-slate-900">{title}</h3>
        <p className="line-clamp-3 text-sm text-slate-600">{description}</p>

        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span key={t} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
              #{t}
            </span>
          ))}
        </div>

        <div className="mt-auto space-y-3 pt-2">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>👨‍🏫 {instructor}</span>
            <span>⏱ {durationHours} სთ</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-amber-500">★ {rating.toFixed(1)}</span>
            <span className="text-slate-500">{studentsCount.toLocaleString('ka-GE')} სტუდენტი</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-100 pt-3">
            <span className={`text-xl font-extrabold ${price === 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
              {price === 0 ? 'უფასო' : `${price} ₾`}
            </span>
            <button
              type="button"
              onClick={() => onSelect?.(course)}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              დეტალები
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
