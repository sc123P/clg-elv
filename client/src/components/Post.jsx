import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

//const Post = ({title, desc, img}) => {
const Post = () => {
    const [posts, setPosts] = useState([]);
    //const category_id = useLocation().search;
    const category_id = useLocation().search;
    //const location = useLocation()
    //console.log(location)

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
        //}, []);
    //const posts = [
    //    {
    //        id: 1,
    //        title: "Comment concevoir un jean pour limiter son impact sur l’environnement ?",
    //        desc: "Réflexion et solutions proposées par des élèves de 3ème",
    //        img: "imageTechno.jpg",
    //    },
    //];
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
                                <p>{post.desc}</p>
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