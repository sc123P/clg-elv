// Pagination.jsx
import React, { useState, useEffect } from 'react';
import Post from './Post';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";
import parse from "html-react-parser";
import ReactPaginate from 'react-paginate';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

  const Pagination = () => {
    moment.updateLocale('fr', {
      months : [
          "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet",
          "Août", "Septembre", "Octobre", "Novembre", "Décembre"
      ]
  });
  const [posts, setPosts] = useState([]);
  const category_id = useLocation().search;
  //CHANGEMENT----------------------------------------------------------------------
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
  //CHANGEMENT----------------------------------------------------------------------
  
  useEffect(() =>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get(`/api/posts${category_id}`);
        setPosts(res.data);
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  }, [category_id]);
  
  const postsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };
  // Utilisez la longueur des posts de la catégorie pour calculer le nombre total de pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Calculez l'index du premier et du dernier post à afficher sur la page actuelle
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - 4;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change la page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Change page
  // const paginate = (pageNumber) => {
  //   if (pageNumber > 0) {
  //     setCurrentPage(pageNumber);
  //   }
  // }

  return (
    <div className="posts">
      {/* {currentPosts.map((posts) => ( */}
      {/* {currentPosts.map((post, index) => (
        <Post key={index} title={post.title} content={post.content} />
      ))} */}

{currentPosts.map((post, index) => (
          <div className="post" key={post.id}>
              <div className="postContent">
                  <Link to={`/actualites/${post.id}`} className="postContentMain">
                      <div className="hr">
                          <div className="image">
                              <img src={`../upload/${post.img}`} alt="" />
                          </div>
                          <div className="postText">
                              <h3>{post.title}</h3>
                              <p>Posté le {moment(post.date).locale('fr').format('DD MMMM YYYY à HH[h]mm') }</p>
                          </div>
                      </div>
                      
                      <hr/>
                  </Link>
              </div>
          </div>
      ))}

      <div className="pagination">
          {/* {Array.from({ length: totalPages }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))} */}

      <ReactPaginate
        className="paginationMain"
        pageCount={totalPages}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"

        previousLabel={ <IoIosArrowBack /> }
        nextLabel={ <IoIosArrowForward /> }
        pageClassName={'page-item'}
        breakLabel={'...'}
        pageLinkClassName={'page-link'}
        activeLinkClassName={'active'}
      />
      </div>
    </div>
  );
};

export default Pagination;
