import { NavLink, Outlet } from 'react-router-dom'
import './App.css'
function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <h1>KanbanTasks</h1>
        <nav>
          <NavLink to="/">Board</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>

      <main className="content">
        <Outlet />   {/* ← router puts Home/About here */}
      </main>

      <footer className="footer">
        <small>Built with React + TypeScript</small>
      </footer>
    </div>
  )
}

export default App