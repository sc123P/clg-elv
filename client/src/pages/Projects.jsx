import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Post from '../components/Post';
import Pagination from '../components/Pagination';
import { IoIosArrowDown } from 'react-icons/io';
// import DropdownMenu from '../components/DropdownMenu';
import axios from 'axios';

const Projects = () => {
    const [open, setOpen] = useState(false);
    // const { subcategory } = useParams(); // Récupère le paramètre de la sous-catégorie depuis l'URL
    // const [posts, setPosts] = useState([]); // État pour stocker les articles récupérés
  
    // useEffect(() => {
    //   // Fonction pour récupérer les articles associés à la sous-catégorie depuis le backend
    //   const fetchPostsBySubcategory = async () => {
    //     try {
    //       const response = await axios.get(`/api/posts/subcat?subcategory=${subcategory}`);
    //       console.log('Response from API:', response.data);
    //       setPosts(response.data);
    //     } catch (error) {
    //       console.error('Erreur lors de la récupération des articles :', error);
    //     }
    //   };
  
    //   fetchPostsBySubcategory();
    // }, [subcategory]);
    // const handleMenuClick = (event) => {
    //     const { target, currentTarget } = event;
    //     const text = target.textContent;
    //     const className = target.className;
    //     console.log('Text:', text);
    //     console.log('Class name:', className);
    //   };
    return (
        <div className="projects">
            <div className="projectsContainer">
                <div className="projectsTop">
                    <div className="projectsTopText">
                        <h1>PROJETS</h1>
                    </div>
                    <div className="projectsTopBlack">
                        <img src="/trianglebgcopie2.png" alt="" />
                    </div>
                </div>

                {/* <Post /> */}
                {/* <div className="dropdown">
                    <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
                        <p>Tous les projets</p>
                        <IoIosArrowDown />
                    </div>

                    <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                        <div className="dropdownList">
                            <ul className="item">
                                
                                {/* <li className="itemContent" onClick={handleMenuClick}> */}
                                {/* <li className="itemContent">
                                    <Link to="/subcategories/projets-etablissements">
                                        <span className="span">
                                            projets établissements
                                        </span>
                                    </Link>
                                </li>
                                <li className="itemContent">
                                    <Link to="/subcategories/projets-pedagogiques">
                                        <span className="span">
                                            projets pédagogiques
                                        </span>
                                    </Link>
                                </li>
                                <li className="itemContent">
                                    <Link to="/subcategories/projets-educatifs">
                                        <span className="span">
                                            projets éducatifs
                                        </span>
                                    </Link>
                                </li> */}

                                {/* <li className="itemContent">
                                    
                                    <Link to={`/`}>
                                        <span className="span">
                                            Rédiger un article
                                        </span> 
                                    </Link>
                                </li> */}
                                

                            {/* </ul>
                        </div>
                    </div>
                </div>  */}

                {/* <DropdownMenu /> */}

        <div className="dropdownP">
            <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
                <p>Tous les projets</p>
                <IoIosArrowDown />
            </div>

            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                <div className="dropdownList">
                    <ul className="item">
                        
                        {/* <li className="itemContent" onClick={handleMenuClick}> */}
                        <li className="itemContent">
                            <Link to="/projets/projets etablissements">
                                <span className="span">
                                    projets établissements
                                </span>
                            </Link>
                        </li>
                        <li className="itemContent">
                            <Link to="/projets/projets pedagogiques">
                                <span className="span">
                                    projets pédagogiques
                                </span>
                            </Link>
                        </li>
                        <li className="itemContent">
                            <Link to="/projets/projets educatifs">
                                <span className="span">
                                    projets éducatifs
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

                <Pagination />
            </div>
        </div>
    );
};

export default Projects;