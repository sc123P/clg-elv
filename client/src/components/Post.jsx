import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import parse from "html-react-parser";
import moment from "moment";
//import 'moment/locale/fr';
//import 'moment/src/locale/fr';
//import 'moment/min/locales';
//import moment from 'moment/min/moment-with-locales';
//import 'moment/min/moment-with-locales';
import 'moment/locale/fr.js';


//const Post = ({title, desc, img}) => {
    const Post = () => {
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
                    const res = await axios.get(`/api/posts${category_id}`);
                    //const res = await axios.get(`/api/posts`);
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
                                {/*<img src={post.img} alt="" />*/}
                                {/*<img src={`../api/upload/${post.img}`} alt="" />*/}
                                {/*<img src={`../client/public/upload/${post.img}`} alt="" />*/}
                                <img src={`../upload/${post.img}`} alt="" />
                            </div>
                            <div className="postText">
                                <h3>{post.title}</h3>
                                {/*<p>Posté {moment(post.date).fromNow()}</p>*/}
                                {/*<p>Posté {moment.locale('fr')} {(post.date)}</p>*/}
                                {/*<p>Posté {moment().fromNow()} {post.date} </p>*/}
                                <p>Posté le {moment(post.date).locale('fr').format('DD MMMM YYYY à HH[h]mm') }</p>
                                {/*{parse(post.desc)}*/}
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