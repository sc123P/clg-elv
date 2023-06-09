import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({title, desc, img}) => {
    const posts = [
        {
            id: 1,
            title: "Comment concevoir un jean pour limiter son impact sur l’environnement ?",
            desc: "Réflexion et solutions proposées par des élèves de 3ème",
            img: "imageTechno.jpg",
        },
    ];
    return (
        <div className="posts">
        {posts.map(post => (
            <div className="post" key={post.id}>
                <div className="postContent">
                    <Link to={`/actualites/${post.id}`} className="postContentMain">
                        <div className="hr">
                            <div className="image">
                                <img src={post.img} alt="" />
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