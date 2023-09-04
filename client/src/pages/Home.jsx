import React, { useEffect, useState } from 'react';
//import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import moment from "moment";

// import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const AnyReactComponent = ({ text }) => <div>{text}</div>;


const Home = () => {
    // const [posts, setPosts] = useState();
    moment.updateLocale('fr', {
        months : [
            "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet",
            "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ]
    });
    const [latestPost, setLatestPost] = useState(null);
    useEffect(() => {
        // Fonction pour récupérer les articles associés à la sous-catégorie depuis le backend
        // const fetchLatestPost = async () => {
        const latestPost = async () => {
          try {
            const response = await axios.get(`/api/posts/latest`);
            console.log('Response from API:', response.data);
            setLatestPost(response.data);
            // latestPost(response.data);
          } catch (error) {
            console.error('Erreur lors de la récupération du dernier article :', error);
          }
        };
    
        // fetchLatestPost();
        latestPost();
      }, []);
    return (
        <div className="home">
            {/*<Navbar />*/}
            <div className="homeContainer">
                <div className="homeTop">
                    <div className="homeTopText">
                        <h1>Premier éco-college de martinique !</h1>
                    </div>
                    <div id="img1">
                        <img src="/fblob.png" />
                    </div>
                    <div id="img2">
                        <img src="/imgclg2.png" />
                    </div>
                    <div id="img3">
                        <img src="/tbasketblob.png" />
                    </div>
                </div>

                <div className="homeMain">
                    <div className="homeButtons">
                        <div className="buttonTop">
                            <a id="button1" href="https://colibri.ac-martinique.fr/auth/saml/wayf?callBack=https%3A%2F%2Fcolibri.ac-martinique.fr%2F#/">ENT</a>
                            <a id="button2" href="https://www.pearltrees.com/">MON ORGANISATION</a>
                            <button id="button3">
                                <Link to={`/projets/?category_id=2`} >
                                    PROJETS
                                </Link>
                            </button>
                        </div>
                        <div className="buttonBottom">
                            <button id="button4">
                                <Link to={`/evenements/?category_id=6`} >
                                    EVENEMENTS
                                </Link>
                            </button>
                            <button id="button5">
                                <Link to={`/actualites`} >
                                    ACTUALITES
                                </Link>
                            </button>
                            <button id="button6">
                                <Link to={`/orientation/?category_id=7`} >
                                    ORIENTATION
                                </Link>
                            </button>
                        </div>
                            <hr/>

                    </div>
                    <div className="firstIllustration">
                        <img src="/chapELV.png" />
                    </div>

                    <div className="homeNews">
                        <div className="homeNewsTitle">
                            <h2>ACTUALITÉS</h2>
                        </div>
                        <div className="homeNewsBox">
                            <div className="homeNewsTop">
                                {/* <div className="homeNewsBoxLeft">
                                    <img src="/Affiche-ecofashion-show-1-jan-2023 copie.jpg" />
                                    <p className="homeNewsDate">Janvier 06, 2023</p>
                                </div>
                                <div className="homeNewsBoxRight">
                                    <h3 className="titleNews">Projet éco-fashion show</h3>
                                    <p className="textNews">
                                        Montre l’étendue de ta création et ton implication dans le développement durable :
                                        Crée, couds, colle, élabore un chapeau, un vêtements ou un accessoire, uniquement, avec des matières ou objets recyclés!
                                        Ta création sera à présenter devant un jury, le jeudi 13 mars 2023 à 12h.
                                        Toutes celles qui seront...
                                    </p>
                                </div> */}
                                
                                {latestPost && (
                                    <div className="post">
                                        <div className="postContent">
                                            {/* <Link to={`/actualites/${latestPost.id}`} className="postContentMain"> */}
                                            <Link to={`/actualites`} className="postContentMain">
                                                <div className="hr">
                                                    <div className="image">
                                                        <img src={`../upload/${latestPost.img}`} alt="" />
                                                        {/* <img src={`../upload/${post.img}`} alt="" /> */}
                                                    </div>
                                                    <div className="postText">
                                                        <h3>{latestPost.title}</h3>
                                                        <p>Posté le {moment(latestPost.date).locale('fr').format('DD MMMM YYYY à HH[h]mm') }</p>
                                                        {/* <h3>{post.title}</h3>
                                                        <p>Posté le {moment(post.date).locale('fr').format('DD MMMM YYYY à HH[h]mm') }</p> */}
                                                    </div>
                                                </div>
                                                
                                                <hr/>
                                            </Link>
                                        </div>
                                    </div>
                                )}

                            </div>

                            <div className="homeNewsBottom">
                                <div className="button">
                                    <Link to={`/actualites`} className="newsButton" >
                                        <span >
                                            Plus d'actualités
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="compasHome">
                    {/* <div> */}
                        <img className="bounce2" src="/illustrationcompasELV copie.png" />
                    </div>





{/*                    // Important! Always set the container height explicitly
                    <div style={{ height: '100vh', width: '100%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API }}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                        >
                            <AnyReactComponent
                            lat={59.955413}
                            lng={30.337844}
                            text="My Marker"
                            />
                        </GoogleMapReact>
</div>*/}
                </div>

            </div>

        </div>
    );
};

export default Home;