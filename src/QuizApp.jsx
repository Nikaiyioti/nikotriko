import { useState } from 'react';
import { quizzes } from './data/quizzes.js';
import QuizContainer from './components/QuizContainer.jsx';
import { useScore } from './context/ScoreContext.jsx';

export default function QuizApp() {
  const [activeId, setActiveId] = useState(null);
  const { results, totalBest, resetAll } = useScore();
  const active = quizzes.find((x) => x.id === activeId);

  return (
    <>
      <header className="topbar">
        <button className="brand" onClick={() => setActiveId(null)} aria-label="მთავარი გვერდი">
          სწავლა<span>+</span>
        </button>
        <div className="topbar__score" title="საუკეთესო შედეგების ჯამი">
          <b>{totalBest}</b> ქულა
        </div>
      </header>

      <main className="page">
        {active ? (
          <QuizContainer key={active.id} quiz={active} onExit={() => setActiveId(null)} />
        ) : (
          <section>
            <div className="intro">
              <h1>აირჩიე ტესტი და შეამოწმე ცოდნა</h1>
              <p>
                ყოველ კითხვას აქვს საკუთარი ტაიმერი. პასუხი დაადასტურე და მაშინვე ნახავ
                ახსნას.
              </p>
            </div>

            <ul className="quiz-list">
              {quizzes.map((qz) => {
                const r = results[qz.id];
                const max = qz.questions.reduce((s, x) => s + x.points, 0);
                return (
                  <li key={qz.id}>
                    <button className="quiz-row" onClick={() => setActiveId(qz.id)}>
                      <span className="quiz-row__best">
                        <b>{r ? r.best : '—'}</b>
                        <small>/ {max}</small>
                      </span>
                      <span className="quiz-row__body">
                        <span className="quiz-row__course">{qz.course}</span>
                        <span className="quiz-row__title">{qz.title}</span>
                        <span className="quiz-row__desc">{qz.description}</span>
                        <span className="quiz-row__info">
                          {qz.questions.length} კითხვა · {qz.secondsPerQuestion} წმ თითოეულზე ·{' '}
                          {qz.level}
                        </span>
                      </span>
                      <span className="quiz-row__cta">{r ? 'თავიდან' : 'დაწყება'}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {Object.keys(results).length > 0 && (
              <button className="link-btn reset" onClick={resetAll}>
                ქულების განულება
              </button>
            )}
          </section>
        )}
      </main>
    </>
  );
}
