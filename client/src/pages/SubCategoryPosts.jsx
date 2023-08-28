import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; // Vous pouvez utiliser Axios pour faire des requêtes HTTP
import Post from '../components/Post';
// import DropdownMenu from './DropdownMenu';
import { IoIosArrowDown } from 'react-icons/io';
import Pagination from '../components/Pagination';


const SubCategoryPosts = () => {
    const [open, setOpen] = useState(false);
    const { subcategory } = useParams(); // Récupère le paramètre de la sous-catégorie depuis l'URL
    // const [posts, setPosts] = useState([]); // État pour stocker les articles récupérés
  
    useEffect(() => {
      // Fonction pour récupérer les articles associés à la sous-catégorie depuis le backend
      const fetchPostsBySubcategory = async () => {
        try {
          const response = await axios.get(`/api/posts/subcat?subcategory=${subcategory}`);
          console.log('Response from API:', response.data);
          setPosts(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des articles :', error);
        }
      };
  
      fetchPostsBySubcategory();
    }, [subcategory]);
  
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
        {/* <h1>Articles de la sous-catégorie : {subcategory}</h1> */}

        <div className="dropdownP">
            <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
                {/* <p>Tous les projets</p> */}
                <p> {subcategory} </p>
                <IoIosArrowDown />
            </div>

            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                <div className="dropdownList">
                    <ul className="item">
                        
                        {/* <li className="itemContent" onClick={handleMenuClick}> */}
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