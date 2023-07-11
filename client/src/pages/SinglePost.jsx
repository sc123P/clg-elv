import React, { useContext, useEffect, useState } from 'react';
//import Navbar from '../components/Navbar';
import { MdEditNote } from 'react-icons/md';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from "moment";
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const SinglePost = () => {
    const [post, setPost] = useState({});
    //const category_id = useLocation().search
    const location = useLocation();
    const navigate = useNavigate();
    const postId = location.pathname.split("/")[2];
    const {currentUser} = useContext(AuthContext);

    //const username = currentUser?.username

    useEffect(() =>{
        const fetchData = async ()=>{
            try{
                //const res = await axios.get(`/api/posts${category_id}`);
                const res = await axios.get(`/api/posts/${postId}`);
                //console.log(res.data);
                setPost(res.data);
            }catch(err){
                console.log(err);
            }
        };
        fetchData();
    }, [postId]);

    const handleDelete = async()=>{
        try{
            //const res = await axios.get(`/api/posts${category_id}`);
            const res = await axios.delete(`/api/posts/${postId}`);
            navigate("/");
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="singlePost">
                {/*<Navbar />*/}
                <div className="singlePostContent">
                    <div className="postTitle">
                        <h3>{post.title}</h3>
                        <p>Posté {moment(post.date).fromNow()}</p>
                    </div>
                        {currentUser?.id === post.uid && (<div className="edit">
                            <Link to={`/write?edit=2`} state={post}>
                                <MdEditNote size={24} className="icons" />
                            </Link>
                            <MdOutlineDeleteOutline onClick={handleDelete} size={24} className="icons" />
                        </div>)}
                    <img src={post?.postsImg} alt="" />
                    <div className="postText">
                        {post.desc}
                    </div> 
                </div>
            </div>
    );
};

export default SinglePost;