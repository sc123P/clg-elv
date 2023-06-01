import React from 'react';
//import Navbar from '../components/Navbar';
import { MdEditNote } from 'react-icons/md';
//import { MdDelete } from 'react-icons/md';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

const SinglePost = () => {
    return (
        <div className="singlePost">
                {/*<Navbar />*/}
                <div className="singlePostContent">
                    <div className="postTitle">
                        <h3>Comment concevoir un jean pour limiter son impact sur l’environnement ?</h3>
                        <p>Posté le 16 mai 2023</p>
                    </div>
                        <div className="edit">
                            <Link to={`/write?edit=2`}>
                                <MdEditNote size={24} className="icons" />
                            </Link>
                            <MdOutlineDeleteOutline size={24} className="icons" />
                        </div>
                    <img src="/imageTechno.jpg" alt="" />
                    <div className="postText">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, assumenda explicabo consectetur ipsam iusto sint maiores adipisci aut autem soluta suscipit minima sequi, beatae ipsa consequatur provident fugit sit ratione!
                    </div> 
                </div>
            </div>
    );
};

export default SinglePost;