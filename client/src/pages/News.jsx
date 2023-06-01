import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const News = () => {
    const posts = [
        {
            id: 1,
            title: "Comment concevoir un jean pour limiter son impact sur l’environnement ?",
            desc: "Réflexion et solutions proposées par des élèves de 3ème",
            img: "imageTechno.jpg",
        },
        {
            id: 2,
            title: "Projet éco-fashion show",
            desc: "Montre l’étendue de ta création et ton implication dans le développement durable: Crée, couds, colle, élabore un chapeau, un vêtements ou un accessoire, uniquement, avec des matières ou objets recyclés! Ta création sera à présenter devant un jury, le jeudi 13 mars 2023 à 12h. Toutes celles qui seront...",
            //img: "Affiche-ecofashion-show-1-jan-2023.jpg",
            img: "Affiche-ecofashion-show-1-jan-2023 copie.jpg",
        },
    ];
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
            </div>    
        </div>
    );
};

export default News;