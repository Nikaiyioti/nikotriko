import { Formik, Form, Field } from 'formik';
import { createAnswerSchema, zodToFormikValidate } from '../schemas/answerSchema.js';

/**
 * QuestionCard — ერთი კითხვის გამოსახვა + პასუხის ვალიდაცია (Formik + Zod).
 *
 * Props:
 *  - question: { id, text, options, correct, explanation, points }
 *  - index, total: ნუმერაციისთვის
 *  - timeLeft, progress: ტაიმერის მნიშვნელობები (useQuizTimer-იდან)
 *  - phase: 'answering' | 'feedback'
 *  - feedback: { selected, isCorrect, timedOut } | null
 *  - onSubmit(answerId): პასუხის დადასტურება
 *  - onNext(): შემდეგი კითხვა / შედეგები
 *  - isLast: ბოლო კითხვაა თუ არა
 */
export default function QuestionCard({
  question,
  index,
  total,
  timeLeft,
  progress,
  phase,
  feedback,
  onSubmit,
  onNext,
  isLast,
}) {
  const schema = createAnswerSchema(question);
  const locked = phase === 'feedback';
  const urgent = !locked && timeLeft <= 5;

  return (
    <article className="qcard" aria-live="polite">
      <div className="qcard__timer" role="timer" aria-label={`დარჩენილი დრო: ${timeLeft} წამი`}>
        <div className="qcard__timer-track">
          <div
            className={`qcard__timer-fill ${urgent ? 'is-urgent' : ''}`}
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
        <span className={`qcard__timer-num ${urgent ? 'is-urgent' : ''}`}>{timeLeft} წმ</span>
      </div>

      <p className="qcard__meta">
        კითხვა {index + 1} / {total} &nbsp;•&nbsp; {question.points} ქულა
      </p>
      <h2 className="qcard__text">{question.text}</h2>

      <Formik
        key={question.id}
        initialValues={{ answer: '' }}
        validate={zodToFormikValidate(schema)}
        validateOnChange
        onSubmit={(values) => onSubmit(values.answer)}
      >
        {({ values, errors, submitCount }) => {
          const showError = submitCount > 0 && errors.answer && !locked;
          return (
            <Form noValidate>
              <fieldset className="options" disabled={locked}>
                <legend className="sr-only">პასუხის ვარიანტები</legend>
                {question.options.map((opt) => {
                  const isSelected = locked
                    ? feedback?.selected === opt.id
                    : values.answer === opt.id;
                  const isCorrect = locked && opt.id === question.correct;
                  const isWrong = locked && isSelected && !isCorrect;
                  const cls = [
                    'option',
                    isSelected && 'is-selected',
                    isCorrect && 'is-correct',
                    isWrong && 'is-wrong',
                  ]
                    .filter(Boolean)
                    .join(' ');
                  return (
                    <label key={opt.id} className={cls}>
                      <Field type="radio" name="answer" value={opt.id} />
                      <span className="option__key">{opt.id.toUpperCase()}</span>
                      <span className="option__text">{opt.text}</span>
                      {isCorrect && <span className="option__badge">სწორია</span>}
                      {isWrong && <span className="option__badge">შენი პასუხი</span>}
                    </label>
                  );
                })}
              </fieldset>

              {showError && (
                <p className="field-error" role="alert">
                  {errors.answer}
                </p>
              )}

              {!locked && (
                <button type="submit" className="btn btn--primary">
                  პასუხის დადასტურება
                </button>
              )}
            </Form>
          );
        }}
      </Formik>

      {locked && (
        <div
          className={`feedback ${feedback?.isCorrect ? 'is-correct' : 'is-wrong'}`}
          role="status"
        >
          <strong>
            {feedback?.timedOut
              ? 'დრო ამოიწურა'
              : feedback?.isCorrect
              ? `სწორია! +${question.points} ქულა`
              : 'არასწორია'}
          </strong>
          <p>{question.explanation}</p>
          <button type="button" className="btn btn--primary" onClick={onNext} autoFocus>
            {isLast ? 'შედეგების ნახვა' : 'შემდეგი კითხვა'}
          </button>
        </div>
      )}
    </article>
  );
}
