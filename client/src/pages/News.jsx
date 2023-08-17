import React from 'react';
import { Link } from 'react-router-dom';
//import Navbar from '../components/Navbar';
import Post from '../components/Post';
import Pagination from '../components/Pagination';


import ReactPaginate from 'react-paginate';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const News = () => {

    // const [data, setData] = useState([]);
    // //const [limit,setLimit]=useState(5);
    // const limit = 5;
    // const [pageCount,setPageCount]=useState(1);
    // //const currentPage=useRef();
    // const [currentPage, setCurrentPage] = useState(0);
    
    // //pagination

    // useEffect(() => {
    //     getPage(currentPage + 1); // Appelez getPaginatedUsers avec la page actuelle
    //   }, [currentPage]);


    //   function changeLimit(){
    //       currentPage.current=1;
    //       //currentPage.current=0;
    //       getPage();
    //     }
        
    //     //function getPaginatedUsers(page){
    //     const getPage = async (page) => {
    //         //fetch(`http://localhost:5173/paginatedUsers?page=${currentPage.current}&limit=${limit}`, {
    //             // fetch(`http://localhost:5173/api/paginatedUsers?page=${page}&limit=${limit}`, {
    //             //     method: "GET",
    //             // })
    //             //axios.get(`/api/paginatedUsers`)
    //             try{
    //                 const res = await axios.get(`/api/page?page=${page}&limit=${limit}`);
    //                 //const res = await axios.get(`/api/page`);
    //                 const responseData = response.data;

    //                 // console.log(data, "userData");
    //                 // setPageCount(data.pageCount);
    //                 // setData(data.result)

    //                 console.log(responseData, "userData");
    //                 setPageCount(responseData.pageCount);
    //                 setData(responseData.result);
    //                 return res.data;
    //             }catch (err) {
    //                 console.log(err);
    //             }
    //         }

    // function handlePageClick(selectedPage) {
    //     setCurrentPage(selectedPage.selected); // Mettez à jour la page actuelle lors du clic sur la pagination
    //   }


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

                {/* <Post /> */}
                <Pagination />
            </div>
        </div>
    );
};

export default News;