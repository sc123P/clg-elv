import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Post from '../components/Post';
import { IoIosArrowDown } from 'react-icons/io';
import Pagination from '../components/Pagination';
import GoBackButton from '../components/GoBackButton';


const SubCategoryPosts = () => {
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });
    useEffect(() =>{
        window.scrollTo(0,0);
    }, []);
    const [open, setOpen] = useState(false);
    const dropdownMenuRef = useRef(null);
    const { subcategory } = useParams(); // Récupère le paramètre de la sous-catégorie depuis l'URL
    // const [posts, setPosts] = useState([]); // État pour stocker les articles récupérés
  
    useEffect(() => {
      // Fonction pour récupérer les articles associés à la sous-catégorie depuis le backend
      const fetchPostsBySubcategory = async () => {
        try {
          const response = await axiosInstance.get(`/api/posts/subcat?subcategory=${subcategory}`);
          console.log('Response from API:', response.data);
          setPosts(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des articles :', error);
        }
      };
  
      fetchPostsBySubcategory();
    }, [subcategory]);

    useEffect(() => {
        // Ajout d'un gestionnaire d'événements pour fermer le dropdown-menu lors du clic à l'extérieur
        function handleClickOutside(event) {
            if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
  
    return (
      <div className="subcategory-posts">
                <div className="projectsTop">
                    <div className="projectsTopText">
                        <h1>{subcategory}</h1>
                    </div>
                    <div className="projectsTopBlack">
                        <img src="/trianglebgcopie2.png" alt="" />
                    </div>
                </div>
                <GoBackButton />
        <div className="dropdownP">
            <div className='menu-trigger' onClick={()=>{setOpen(!open)}} ref={dropdownMenuRef}>
                <p> {subcategory} </p>
                <IoIosArrowDown />
            </div>

            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                <div className="dropdownList">
                    <ul className="item">
                        <li className="itemContent">
                            <Link to="/projets/projets établissements">
                                <span className="span">
                                    projets établissements
                                </span>
                            </Link>
                        </li>
                        <li className="itemContent">
                            <Link to="/projets/projets pédagogiques">
                                <span className="span">
                                    projets pédagogiques
                                </span>
                            </Link>
                        </li>
                        <li className="itemContent">
                            <Link to="/projets/projets éducatifs">
                                <span className="span">
                                    projets éducatifs
                                </span>
                            </Link>
                        </li>
                        <li className="itemContent">
                            <Link to="/projets/?category_id=2">
                                <span className="span">
                                    Tous les projets
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="post-list">
          {/* {posts.map(post => ( */}
            {/* // <Post key={post.id} post={post} /> */}
            {/* {posts.map(post => (
            <Post key={post.id} post={post} />
          ))} */}
        </div>
              
          <Pagination />
      </div>
    );
  };
  
  export default SubCategoryPosts;  