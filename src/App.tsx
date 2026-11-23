import CourseCatalog from './components/CourseCatalog';

export default function App() {
  return (
    <div className="app min-h-screen">
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

      <footer className="app__footer">© 2026 EdTech LMS · სტუდენტი 1: კურსების კატალოგი</footer>
    </div>
  );
}
