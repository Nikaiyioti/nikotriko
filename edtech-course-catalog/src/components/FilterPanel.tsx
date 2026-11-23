import type { CourseFilters, CourseLevel, PriceFilter, SortKey } from '../types/course';

interface FilterPanelProps {
  filters: CourseFilters;
  categories: string[];
  subcategories: string[];
  onChange: (patch: Partial<CourseFilters>) => void;
  onReset: () => void;
}

const LEVELS: CourseLevel[] = ['დამწყები', 'საშუალო', 'მოწინავე'];

const PRICE_OPTIONS: { value: PriceFilter; label: string }[] = [
  { value: 'all', label: 'ყველა' },
  { value: 'free', label: 'უფასო' },
  { value: 'paid', label: 'ფასიანი' },
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'popular', label: 'პოპულარული' },
  { value: 'rating', label: 'რეიტინგით' },
  { value: 'priceAsc', label: 'ფასი: ზრდადი' },
  { value: 'priceDesc', label: 'ფასი: კლებადი' },
  { value: 'duration', label: 'ხანგრძლივობით' },
];

const labelCls = 'mb-2 block text-sm font-semibold text-slate-700';
const inputCls =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100';

export default function FilterPanel({ filters, categories, subcategories, onChange, onReset }: FilterPanelProps) {
  const toggleLevel = (level: CourseLevel) => {
    const levels = filters.levels.includes(level)
      ? filters.levels.filter((l) => l !== level)
      : [...filters.levels, level];
    onChange({ levels });
  };

  return (
    <aside className="filter-panel space-y-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">ფილტრები</h2>
        <button type="button" onClick={onReset} className="text-sm font-medium text-brand-600 hover:underline">
          გასუფთავება
        </button>
      </div>

      {/* დონე 1: ძიება */}
      <div>
        <label htmlFor="search" className={labelCls}>ძიება</label>
        <input
          id="search"
          type="search"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="კურსი, ლექტორი, თეგი..."
          className={inputCls}
        />
      </div>

      {/* დონე 2: კატეგორია */}
      <div>
        <label htmlFor="category" className={labelCls}>კატეგორია</label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => onChange({ category: e.target.value, subcategory: 'all' })}
          className={inputCls}
        >
          <option value="all">ყველა კატეგორია</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* დონე 3: ქვეკატეგორია (დამოკიდებულია კატეგორიაზე) */}
      <div>
        <label htmlFor="subcategory" className={labelCls}>ქვეკატეგორია</label>
        <select
          id="subcategory"
          value={filters.subcategory}
          onChange={(e) => onChange({ subcategory: e.target.value })}
          className={inputCls}
        >
          <option value="all">ყველა ქვეკატეგორია</option>
          {subcategories.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* დონე 4: სირთულის დონე */}
      <fieldset>
        <legend className={labelCls}>სირთულე</legend>
        <div className="space-y-2">
          {LEVELS.map((level) => (
            <label key={level} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={filters.levels.includes(level)}
                onChange={() => toggleLevel(level)}
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              {level}
            </label>
          ))}
        </div>
      </fieldset>

      {/* დონე 5: ფასი */}
      <fieldset>
        <legend className={labelCls}>ფასი</legend>
        <div className="flex gap-2">
          {PRICE_OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange({ price: o.value })}
              className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                filters.price === o.value
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* დონე 6: მინიმალური რეიტინგი */}
      <div>
        <label htmlFor="rating" className={labelCls}>
          მინიმალური რეიტინგი: <span className="text-brand-600">{filters.minRating.toFixed(1)} ★</span>
        </label>
        <input
          id="rating"
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={filters.minRating}
          onChange={(e) => onChange({ minRating: Number(e.target.value) })}
          className="w-full accent-brand-600"
        />
      </div>

      {/* დონე 7: მაქსიმალური ხანგრძლივობა */}
      <div>
        <label htmlFor="duration" className={labelCls}>
          ხანგრძლივობა: <span className="text-brand-600">{filters.maxDuration} სთ-მდე</span>
        </label>
        <input
          id="duration"
          type="range"
          min={5}
          max={100}
          step={5}
          value={filters.maxDuration}
          onChange={(e) => onChange({ maxDuration: Number(e.target.value) })}
          className="w-full accent-brand-600"
        />
      </div>

      <div>
        <label htmlFor="sort" className={labelCls}>დალაგება</label>
        <select
          id="sort"
          value={filters.sort}
          onChange={(e) => onChange({ sort: e.target.value as SortKey })}
          className={inputCls}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </aside>
  );
}
