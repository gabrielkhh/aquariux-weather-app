import { useState } from 'react'
import './App.css'
import Home from './pages/Home';
import Search from './pages/Search';
import Navbar from './components/Navbar';
import { useGlobalStore } from './store/useStore';

function App() {
  const { currentView } = useGlobalStore();

  return (
    <div className="relative h-screen">
      <Navbar />

      <div className="container mx-auto mt-3 px-3">
        {currentView === 'home' && <Home />}
        {currentView === 'search' && <Search />}
      </div>
    </div>
  )
}

export default App
