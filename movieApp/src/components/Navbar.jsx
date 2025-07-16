import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-zinc-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        🎬 SceneIt
      </Link>

      <div className="flex gap-5">
        <Link to="/" className="hover:text-red-600 transition">Home</Link>
        <Link to="/watchlist" className="hover:text-red-600 transition">Watchlist</Link>
        <Link to="/login" className="hover:text-red-600 transition">Login</Link>
      </div>
    </nav>
  )
}

export default Navbar