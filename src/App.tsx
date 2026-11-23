import { useState } from 'react';
import QuizApp from './QuizApp.jsx';
import CourseCatalog from './components/CourseCatalog';

type Tab = 'quiz' | 'catalog';

const TABS: { id: Tab; label: string }[] = [
  { id: 'quiz', label: 'ტესტები და ქვიზები' },
  { id: 'catalog', label: 'კურსების კატალოგი' },
];

export default function App() {
  const [tab, setTab] = useState<Tab>('quiz');

  return (
    <>
      <nav className="site-nav border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl gap-2 px-4 py-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-current={tab === t.id ? 'page' : undefined}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                tab === t.id ? 'bg-brand-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      {tab === 'quiz' ? (
        <QuizApp />
      ) : (
        <div className="app">
          <header className="app__header">
            <div className="app__container">
              <p className="app__badge">EdTech LMS</p>
              <h1 className="app__title">კურსების კატალოგი</h1>
              <p className="app__subtitle">აირჩიეთ თქვენთვის შესაფერისი კურსი მრავალდონიანი ფილტრაციით</p>
            </div>
          </header>
          <main className="app__container app__main">
            <CourseCatalog />
          </main>
        </div>
      )}
    </>
  );
}
