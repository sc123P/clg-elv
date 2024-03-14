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
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
  });
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
        const response = await axiosInstance.get(`/api/posts/subcat?subcategory=${subcategory}`);
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
        const res = await axiosInstance.get(`/api/posts${category_id}`);
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
  // Utilise la longueur des posts de la catégorie pour calculer le nombre total de pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Calcule l'index du premier et du dernier post à afficher sur la page actuelle
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change la page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Change page
  // const paginate = (pageNumber) => {
  //   if (pageNumber > 0) {
  //     setCurrentPage(pageNumber);
  //   }
  // }
  // const pagesToJump = 5; // Nombre de pages à sauter à chaque clic sur les flèches supplémentaires.

  const [pageToJump, setPageToJump] = useState(1);
  const jumpToPage = (pageNumber) => {
    const newPage = currentPage + pageNumber;
    console.log('currentPage:', currentPage);
    console.log('pageNumber:', pageNumber);
    console.log('newPage:', newPage);
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // setPageToJump(1);
      console.log('setCurrentPage called with newPage:', newPage);
    }
  };
  useEffect(() => {
    // Met à jour la page actuelle avec pageToJump lorsque pageToJump change
    setCurrentPage(pageToJump);
  }, [pageToJump]);
  const shouldJumpToLastPage = totalPages <= 5;

  return (
    <div className="posts">
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
      <ReactPaginate
        className="paginationMain"
        pageCount={totalPages}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        previousLabel={ 
         <IoIosArrowBack />
      }
        nextLabel={
         <IoIosArrowForward />
       }
        pageClassName={'page-item'}
        breakLabel={'...'}
        pageLinkClassName={'page-link'}
        activeLinkClassName={'active'}
        marginPagesDisplayed={0}
        pageRangeDisplayed={4}
      />
      </div>
    </div>
  );
};

export default Pagination;
