import React from 'react';
import Navbar from '../components/Navbar';

const SinglePost = () => {
    return (
        <div className="singlePost">
                {/*<Navbar />*/}
                <div className="singlePostContent">
                    <div className="postTitle">
                        <h3>Comment concevoir un jean pour limiter son impact sur l’environnement ?</h3>
                        <p>Posté le 16 mai 2023</p>
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