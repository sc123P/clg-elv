import React, { useEffect } from 'react';
import Pagination from '../components/Pagination';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router';
import GoBackButton from '../components/GoBackButton';

const News = () => {
    useEffect(() =>{
        window.scrollTo(0,0);
    }, []);

    return (
        <div className="news">
            <div className="newsContainer">
                <div className="newsTop">
                    <div className="newsTopText">
                        <h1>ACTUALITES</h1>
                    </div>
                    <div className="newsTopBlack">
                        <img src="/trianglebgcopie2.png" />
                        {/* <img src="/trianglebgcopie3.png" /> */}
                    </div>
                </div>
                <GoBackButton />
                <Pagination />
            </div>
        </div>
    );
};

export default News;