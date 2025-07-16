import { Link } from 'react-router-dom'
import { useUser } from "../context/UserContext"
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {

  const { user } = useUser();
  const auth = getAuth();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-zinc-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        🎬 SceneIt
      </Link>

      <div className="flex gap-5">
        <Link to="/" className="hover:text-red-600 transition">Home</Link>
        <Link to="/watchlist" className="hover:text-red-600 transition">Watchlist</Link>
        {!user ? (<Link to="/login" className="hover:text-red-600 transition">Login</Link>) 
        : (
          <button
            onClick={handleLogout}
            className="hover:text-red-600 transition"
          >
            Log out
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar