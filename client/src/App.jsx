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
import SubCategoryPosts from './pages/SubCategoryPosts';
import Footer from './components/Footer';

import { AuthContext } from './context/authContext';
import { useContext } from 'react';

function App() {
  const {currentUser, setCurrentUser} = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route exact path="/actualites" element={ <News /> } />
        <Route exact path="/actualites/:id" element={ <SinglePost /> } />
        {currentUser ? <> <Route exact path="/write" element={ <Write /> } /> </> : <></>}
        <Route exact path="/nous_connaitre" element={ <AboutUs /> } />
        <Route exact path="/contact" element={ <Contact /> } />
        <Route exact path="/projets" element={ <Projects /> } />
        <Route exact path="/projets/:subcategory" element={<SubCategoryPosts />} />
        <Route exact path="/evenements" element={ <Events /> } />
        <Route exact path="/orientation" element={ <Orientation /> } />
        <Route exact path="/enregistrement" element={ <Signup /> } />
        <Route exact path="/connexion" element={ <Login /> } />
        {/*<Route path="/page/:pageNumber" component={<Pagination />} />*/}
        {/* <Route path="/?category_id/page/:pageNumber" element={<Pagination category={category} /> } /> */}
        
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
