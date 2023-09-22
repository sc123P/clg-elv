import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
//import Navbar from '../components/Navbar';
import Post from '../components/Post';
import Pagination from '../components/Pagination';


import ReactPaginate from 'react-paginate';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
// import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import GoBackButton from '../components/GoBackButton';

const News = () => {
    useEffect(() =>{
        window.scrollTo(0,0);
    }, []);
    // const navigate = useNavigate();
	// const goBack = () => {
	// 	navigate(-1);
	// }


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

                {/* <button onClick={goBack}>Retour</button> */}
                <GoBackButton />

                {/* <Post /> */}
                <Pagination />
            </div>
        </div>
    );
};

export default News;