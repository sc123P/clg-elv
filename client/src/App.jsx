//import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import News from './pages/News';
import SinglePost from './pages/SinglePost';
import Write from './pages/Write';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Events from './pages/Events';
import Orientation from './pages/Orientation';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route exact path="/actualites" element={ <News /> } />
        <Route exact path="/actualites/:id" element={ <SinglePost /> } />
        <Route exact path="/write" element={ <Write /> } />
        <Route exact path="/nous_connaitre" element={ <AboutUs /> } />
        <Route exact path="/contact" element={ <Contact /> } />
        <Route exact path="/projets" element={ <Projects /> } />
        <Route exact path="/evenements" element={ <Events /> } />
        <Route exact path="/orientation" element={ <Orientation /> } />
        <Route exact path="/enregistrement" element={ <Signup /> } />
        <Route exact path="/connexion" element={ <Login /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
