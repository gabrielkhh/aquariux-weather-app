import { useState } from 'react'
import './App.css'
import Home from './pages/Home';
import Search from './pages/Search';
import Navbar from './components/Navbar';

export type PageView = "home" | "search";

function App() {
  const [view, setView] = useState<PageView>("home");

  return (
    <div className="relative h-screen">
      <Navbar view={view} setView={setView} />

      <div className="w-screen">
        {view === 'home' && <Home />}
        {view === 'search' && <Search />}
      </div>
    </div>
  )
}

export default App
