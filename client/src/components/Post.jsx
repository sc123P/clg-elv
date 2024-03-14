import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import parse from "html-react-parser";
import moment from "moment";
import 'moment/locale/fr.js';

    const Post = () => {
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
                return (
                    <div className="posts">
        {posts.map(post => (
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
    </div>
    );
};

export default Post;