import { createContext, useContext, useMemo, useReducer } from 'react';

/**
 * გლობალური ქულების კონტექსტი (useContext).
 * results: { [quizId]: { score, maxScore, best, attempts, answers } }
 * ქულები ინახება მთელი სესიის განმავლობაში და ჩანს ყველა კომპონენტში.
 */
const ScoreContext = createContext(null);

const initialState = {
  current: null, // მიმდინარე ქვიზის მდგომარეობა
  results: {}, // დასრულებული ქვიზების შედეგები
};

function reducer(state, action) {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        current: { quizId: action.quizId, score: 0, answers: [] },
      };
    case 'ANSWER': {
      if (!state.current) return state;
      const { questionId, selected, isCorrect, points } = action.payload;
      return {
        ...state,
        current: {
          ...state.current,
          score: state.current.score + (isCorrect ? points : 0),
          answers: [...state.current.answers, { questionId, selected, isCorrect }],
        },
      };
    }
    case 'FINISH': {
      if (!state.current) return state;
      const { quizId, score, answers } = state.current;
      const prev = state.results[quizId];
      return {
        ...state,
        current: null,
        results: {
          ...state.results,
          [quizId]: {
            score,
            maxScore: action.maxScore,
            answers,
            best: Math.max(prev?.best ?? 0, score),
            attempts: (prev?.attempts ?? 0) + 1,
          },
        },
      };
    }
    case 'RESET_ALL':
      return initialState;
    default:
      return state;
  }
}

export function ScoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    const totalBest = Object.values(state.results).reduce((sum, r) => sum + r.best, 0);
    return {
      current: state.current,
      results: state.results,
      totalBest,
      startQuiz: (quizId) => dispatch({ type: 'START', quizId }),
      recordAnswer: (payload) => dispatch({ type: 'ANSWER', payload }),
      finishQuiz: (maxScore) => dispatch({ type: 'FINISH', maxScore }),
      resetAll: () => dispatch({ type: 'RESET_ALL' }),
    };
  }, [state]);

  return <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>;
}

export function useScore() {
  const ctx = useContext(ScoreContext);
  if (!ctx) throw new Error('useScore უნდა გამოიყენოთ ScoreProvider-ის შიგნით');
  return ctx;
}
