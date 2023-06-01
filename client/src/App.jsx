//import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import News from './pages/News';
import SinglePost from './pages/SinglePost';
import Write from './pages/Write';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route exact path="/actualites" element={ <News /> } />
        <Route exact path="/actualites/:id" element={ <SinglePost /> } />
        <Route exact path="/write" element={ <Write /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
