# EdTech LMS — კურსების კატალოგი (სტუდენტი 1)

React + TypeScript + Tailwind CSS + Sass

## გაშვება
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # პროდაქშენ ბილდი
```

## სტრუქტურა
- `src/types/course.ts` — `Course` interface და ფილტრების ტიპები
- `src/hooks/useFetchCourses.ts` — Custom Hook (fetch + loading/error + AbortController)
- `src/components/CourseCatalog.tsx` — მთავარი კომპონენტი (state, ფილტრაცია)
- `src/components/CourseCard.tsx` — ერთი კურსის ბარათი (Props)
- `src/components/FilterPanel.tsx` — ფილტრების პანელი
- `src/utils/filterCourses.ts` — მრავალდონიანი ფილტრაციის ლოგიკა
- `src/styles/` — Sass (`_variables.scss` mixin-ებით `up()`/`down()` მედია-ქვერებისთვის)
- `public/courses.json` — კურსების მონაცემები, რომელიც fetch-ით იტვირთება
