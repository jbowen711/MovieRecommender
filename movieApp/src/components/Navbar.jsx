import { Link } from 'react-router-dom'
import { useUser } from "../context/UserContext"
import { getAuth, signOut } from "firebase/auth";
import { useLocation } from 'react-router-dom';


const Navbar = () => {

  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useUser();
  const auth = getAuth();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("User logged out");
      setIsOpen("");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


const linkStyle = (link) =>
  `transition px-1 ${
    currentPath === link ? "text-red-600 text-md font-semibold border rounded" : "text-white text-md hover:text-red-600 hover:font-bold transition-colors duration-500"
  }`;



  return (
    <nav className="bg-zinc-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-2xl tracking-wide font-bold">
        🎬 SceneIt
      </Link>

      <div className="flex gap-6">
        <Link to="/" className={linkStyle("/")}>Home</Link>
        <Link to="/explore" className={linkStyle("/explore")}>Explore</Link>
        <Link to="/movieList" className={linkStyle("/movieList")}>Movie List</Link>

        {!user ? (<Link to="/login" className={linkStyle("/login")}>Login</Link>)
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