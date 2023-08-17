//import React, { useState } from 'react';
import React from 'react';
import Post from '../components/Post';
import Pagination from '../components/Pagination';

const Events = () => {
    // const Events = ({ posts }) => {
    //     console.log(posts)
    // //const PostList = ({ posts }) => {
    //     const [currentPage, setCurrentPage] = useState(1);
    //     const postsPerPage = 5;
      
    //     // Calcule l'index du premier et du dernier article de la page actuelle
    //     const indexOfLastPost = currentPage * postsPerPage;
    //     const indexOfFirstPost = indexOfLastPost - postsPerPage;
    //     //const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    //     //const currentPosts = posts;
    //     // const postsLength = {
    //     //     array.forEach(posts) => {
    //     //         postsLength = postsLength + 1;
    //     //     });
    //     // }
      
    //     // Fonction pour changer de page
    //     const paginate = (pageNumber) => setCurrentPage(pageNumber);




    return (
        <div className="events">
            <div className="eventsContainer">
                <div className="eventsTop">
                    <div className="eventsTopText">
                        <h1>EVENEMENTS</h1>
                    </div>
                    <div className="eventsTopBlack">
                        <img src="/trianglebgcopie2.png" alt="" />
                    </div>
                </div>


                {/* <Post /> */}
        
                {/* <Pagination posts={<Post />} /> */}
                <Pagination />



        {/* <div>
        {/* {posts.map((posts) => (
          <Post key={post.id} post={post} />
        ))} */}
        {/* <Post posts={currentPosts} /> */}
        {/* <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        /> */}
            </div>
        </div>
    );
};

export default Events;