import { useScore } from '../context/ScoreContext.jsx';

export default function ResultScreen({ quiz, onRetry, onExit }) {
  const { results, totalBest } = useScore();
  const r = results[quiz.id];
  if (!r) return null;

  const percent = Math.round((r.score / r.maxScore) * 100);
  const correctCount = r.answers.filter((a) => a.isCorrect).length;
  const verdict =
    percent >= 80 ? 'შესანიშნავია!' : percent >= 50 ? 'კარგია, გააგრძელე!' : 'სცადე ხელახლა';

  return (
    <section className="result">
      <p className="result__course">{quiz.title}</p>
      <h1 className="result__verdict">{verdict}</h1>

      <div className="result__score">
        <div
          className="ring"
          style={{ '--p': percent }}
          role="img"
          aria-label={`შედეგი ${percent} პროცენტი`}
        >
          <span>{percent}%</span>
        </div>
        <dl>
          <div>
            <dt>ამ მცდელობის ქულა</dt>
            <dd>{r.score} / {r.maxScore}</dd>
          </div>
          <div>
            <dt>სწორი პასუხები</dt>
            <dd>{correctCount} / {quiz.questions.length}</dd>
          </div>
          <div>
            <dt>საუკეთესო შედეგი</dt>
            <dd>{r.best}</dd>
          </div>
          <div>
            <dt>სულ ქულები (ყველა ტესტი)</dt>
            <dd>{totalBest}</dd>
          </div>
        </dl>
      </div>

      <ol className="review">
        {quiz.questions.map((qq, i) => {
          const a = r.answers[i];
          const chosen = qq.options.find((o) => o.id === a?.selected);
          const correct = qq.options.find((o) => o.id === qq.correct);
          return (
            <li key={qq.id} className={a?.isCorrect ? 'ok' : 'bad'}>
              <span className="review__q">{qq.text}</span>
              <span className="review__a">
                {a?.isCorrect
                  ? `✓ ${correct.text}`
                  : `✗ ${chosen ? chosen.text : 'პასუხი არ გაცემულა'} — სწორია: ${correct.text}`}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="result__actions">
        <button type="button" className="btn btn--primary" onClick={onRetry}>
          თავიდან ცდა
        </button>
        <button type="button" className="btn btn--ghost" onClick={onExit}>
          ყველა ტესტი
        </button>
      </div>
    </section>
  );
}
