import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import AddExperience from './pages/AddExperience'
import Search from './pages/Search'
import { HomeIcon, PlusCircleIcon, SearchIcon } from 'lucide-react'; // or use Heroicons
import ExperienceDetail from './pages/ExperienceDetail'

function App() {

  return (
    <BrowserRouter>
      <div className="pb-20 min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddExperience />} />
          <Route path="/search" element={<Search />} />
          <Route path="/experiences/:id" element={<ExperienceDetail />} />
        </Routes>
      </div>

      {/* Floating Bottom Nav */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-full flex gap-10 px-8 py-3 z-50 border border-gray-200">
        <NavLink to="/" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-500'}>
          <HomeIcon className="w-6 h-6" />
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-500'}>
          <PlusCircleIcon className="w-6 h-6" />
        </NavLink>
        <NavLink to="/search" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-500'}>
          <SearchIcon className="w-6 h-6" />
        </NavLink>
      </nav>
    </BrowserRouter>
  )
}

export default App
