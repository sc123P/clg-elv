import React from 'react';
import ReactPaginate from 'react-paginate';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

import { useEffect, useState } from 'react';
import Post from './Post';

const Pagination = () => {
    const [items, setItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    //let limit = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() =>{
        fetchTotalItems();
    }, []);
    const fetchTotalItems = async () =>{
        const res = await fetch('http://localhost:5173/actualites');
        const data = await res.json();
        const total = data.length;
        setTotalItems(total);
        const totalPages = Math.ceil(total / limit);
        setPageCount(totalPages);
        fetchNews(1);
    };
    const fetchNews = async (currentPage) =>{
        const res = await fetch(
            `http://localhost:5173/actualites?_page=1&_limit=${limit}`
        );
        const data = await res.json();
        setItems(data);
    };

{/*    useEffect(() =>{
        const getNews = async () => {
            const res = await fetch(`http://localhost:5173/actualites?_page=1&_limit=${limit}`);
        
        const data = await res.json();
        const total = res.headers.get("x-total-count");
        setPageCount(Math.ceil(total / limit));
        setItems(data);
        };
        getNews();
    }, [limit]);
    const fetchNews = async (currentPage) =>{
        const res = await fetch(
            `http://localhost:5173/actualites?_page=1&_limit=${limit}`
        );
        const data = await res.json();
        return data;
    };*/}

    const handlePageClick = async (data) =>{
        //let currentPage = data.selected + 1;
        const selectedPage = data.selected + 1;

        if(selectedPage > pageCount){
            setCurrentPage(pageCount);
            fetchNews(pageCount);
        }else{
            setCurrentPage(selectedPage);
            fetchNews(selectedPage);
        }
        //setCurrentPage(selectedPage);
        //const newsFormServer = await fetchNews(selectedPage);

        //setItems(newsFormServer);
    };


    return (
        <div>
            {items.map((post) => (
                <Post
                    key={post.id}
                    title={post.title}
                    desc={post.desc}
                    img={post.img}
                 />
            ))}
            <ReactPaginate
                className="paginationMain"
                previousLabel={ <IoIosArrowBack /> }
                nextLabel={ <IoIosArrowForward /> }
                breakLabel={'...'}
                pageCount={10}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                activeLinkClassName={'active'}
            />
        </div>
    );
};

export default Pagination;