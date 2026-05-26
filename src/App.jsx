import HabitTracker from './components/HabitTracker.jsx';
import './App.css';
import Hero from './components/hero.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';





function App() {
  return (
    <div className="app-shell">
      <Nav />
      <main>
        <Hero />
        <HabitTracker />
      </main>
      <Footer />
    </div>
  );
}

export default App;
