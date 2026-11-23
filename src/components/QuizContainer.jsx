import { useCallback, useEffect, useRef, useState } from 'react';
import QuestionCard from './QuestionCard.jsx';
import ResultScreen from './ResultScreen.jsx';
import { useScore } from '../context/ScoreContext.jsx';
import { useQuizTimer } from '../hooks/useQuizTimer.js';

/**
 * QuizContainer — ქვიზის მთავარი ლოგიკა:
 * მიმდინარე კითხვის ინდექსი, ტაიმერი, ქულების ჩაწერა კონტექსტში.
 */
export default function QuizContainer({ quiz, onExit }) {
  const { current, startQuiz, recordAnswer, finishQuiz } = useScore();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('answering'); // answering | feedback | done
  const [feedback, setFeedback] = useState(null);
  const started = useRef(false);

  const question = quiz.questions[index];
  const isLast = index === quiz.questions.length - 1;
  const maxScore = quiz.questions.reduce((s, x) => s + x.points, 0);

  // ქვიზის დაწყებისას კონტექსტში ვქმნით ახალ მცდელობას
  useEffect(() => {
    startQuiz(quiz.id);
    started.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz.id]);

  const submitAnswer = useCallback(
    (selected, timedOut = false) => {
      if (phase !== 'answering') return;
      const isCorrect = !timedOut && selected === question.correct;
      recordAnswer({
        questionId: question.id,
        selected,
        isCorrect,
        points: question.points,
      });
      setFeedback({ selected, isCorrect, timedOut });
      setPhase('feedback');
    },
    [phase, question, recordAnswer]
  );

  const timer = useQuizTimer(quiz.secondsPerQuestion, {
    onExpire: () => submitAnswer(null, true),
  });

  const handleSubmit = (answerId) => {
    timer.pause();
    submitAnswer(answerId, false);
  };

  const handleNext = () => {
    if (isLast) {
      finishQuiz(maxScore);
      setPhase('done');
      return;
    }
    setIndex((i) => i + 1);
    setFeedback(null);
    setPhase('answering');
    timer.reset(quiz.secondsPerQuestion, true);
  };

  const restart = () => {
    startQuiz(quiz.id);
    setIndex(0);
    setFeedback(null);
    setPhase('answering');
    timer.reset(quiz.secondsPerQuestion, true);
  };

  if (phase === 'done') {
    return <ResultScreen quiz={quiz} onRetry={restart} onExit={onExit} />;
  }

  return (
    <section className="quiz">
      <div className="quiz__head">
        <button type="button" className="link-btn" onClick={onExit}>
          ← ყველა ტესტი
        </button>
        <div className="quiz__title">
          <span>{quiz.course}</span>
          <h1>{quiz.title}</h1>
        </div>
        <div className="quiz__live-score" aria-label="მიმდინარე ქულა">
          <b>{current?.score ?? 0}</b>
          <span>/ {maxScore}</span>
        </div>
      </div>

      <div className="steps" aria-hidden="true">
        {quiz.questions.map((x, i) => {
          const a = current?.answers[i];
          const cls = a ? (a.isCorrect ? 'ok' : 'bad') : i === index ? 'now' : '';
          return <i key={x.id} className={cls} />;
        })}
      </div>

      <QuestionCard
        question={question}
        index={index}
        total={quiz.questions.length}
        timeLeft={timer.timeLeft}
        progress={timer.progress}
        phase={phase}
        feedback={feedback}
        onSubmit={handleSubmit}
        onNext={handleNext}
        isLast={isLast}
      />
    </section>
  );
}
