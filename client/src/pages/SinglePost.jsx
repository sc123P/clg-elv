import React, { useContext, useEffect, useState } from 'react';
import { MdEditNote } from 'react-icons/md';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from "moment";
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import parse from "html-react-parser";
import DOMPurify from 'dompurify';
import GoBackButton from '../components/GoBackButton';

const SinglePost = () => {
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });
    const [post, setPost] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const postId = location.pathname.split("/")[2];
    const {currentUser} = useContext(AuthContext);
    useEffect(() =>{
        window.scrollTo(0,0);
    }, []);

    useEffect(() =>{
        const fetchData = async ()=>{
            try{
                //const res = await axios.get(`/api/posts${category_id}`);
                const res = await axiosInstance.get(`/api/posts/${postId}`);
                console.log(res.data);
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
            const res = await axiosInstance.delete(`/api/posts/${postId}`);
            navigate("/");
        }catch(err){
            console.log(err);
        }
    }

    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
      }

    return (
        <div className="singlePost">
                    <GoBackButton />
                    <div className="singlePostContent">
                    <div className="postTitle">
                        <h3>{post.title}</h3>
                        <p>Posté le {moment(post.date).locale('fr').format('DD MMMM YYYY à HH[h]mm') }</p>
                    </div>
                        {currentUser?.id === post.uid && (<div className="edit">
                            <Link to={`/write?edit=2`} state={post}>
                                <MdEditNote size={24} className="icons" />
                            </Link>
                            <MdOutlineDeleteOutline onClick={handleDelete} size={24} className="icons" />
                        </div>)}
                    {/*<img src={post?.postsImg} alt="" />*/}
                    <img src={`../upload/${post?.postsImg}`} alt="" />
                    <div className="postText">
                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc),}}></p>
                    </div>
                </div>
            </div>
    );
};

export default SinglePost;