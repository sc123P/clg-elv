import React from 'react';
import { Link } from 'react-router-dom';
//import Navbar from '../components/Navbar';
import Post from '../components/Post';
import Pagination from '../components/Pagination';

const News = () => {
    return (
        <div className="news">
            {/*<Navbar />*/}
            <div className="newsContainer">

                <div className="newsTop">
                    <div className="newsTopText">
                        <h1>ACTUALITES</h1>
                    </div>
                    <div className="newsTopBlack">
                        <img src="/trianglebgcopie2.png" />
                    </div>
                </div>

                <Post />
                {/*<Post />
                <Post />
                <Post />
                <Post />*/}

                <Pagination />

            </div>    
        </div>
    );
};

export default News;