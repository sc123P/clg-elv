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
import Pagination from './components/Pagination';

function App() {

  //const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const category = searchParams.get('category_id');

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={ <Home /> } />
        {/* <Route exact path="/actualites" element={ <News /> } /> */}
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

        {/* Définissez ici vos routes pour les différentes pages */}
        {/*<Route path="/page/:pageNumber" component={<Pagination />} />*/}
        {/* <Route path="/?category_id/page/:pageNumber" element={<Pagination category={category} /> } /> */}
        {/* Autres routes de votre application */}
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
