# სწავლა+ — EdTech LMS: ონლაინ ტესტები და ქვიზები

React + Vite პროექტი: მრავალარჩევანიანი ტესტები, Formik + Zod ვალიდაცია, useContext ქულებისთვის, useQuizTimer ჰუკი.

## გაშვება
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
```

## სტრუქტურა
- `src/components/QuizContainer.jsx` — ქვიზის ლოგიკა (კითხვა, ტაიმერი, ქულები)
- `src/components/QuestionCard.jsx` — ერთი კითხვა, Formik ფორმა, Zod ვალიდაცია
- `src/components/ResultScreen.jsx` — შედეგები და პასუხების მიმოხილვა
- `src/context/ScoreContext.jsx` — გლობალური ქულები (useContext + useReducer)
- `src/hooks/useQuizTimer.js` — Custom Hook ტაიმერისთვის
- `src/schemas/answerSchema.js` — Zod სქემა + Formik ადაპტერი
- `src/data/quizzes.js` — ტესტების მონაცემები (აქ დაამატე ახალი ტესტები)
