import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {

  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
      <nav className='sticky top-0 z-50'>
        <Navbar/>
      </nav>
      <main className='flex-grow'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='login' element={<Login/>}/>
      </Routes>
      </main>
      <Footer/>
      </div>
    </Router>
  )
}

export default App
