import React, { useEffect, useState } from 'react';
//import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import moment from "moment";

// import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const AnyReactComponent = ({ text }) => <div>{text}</div>;


const Home = () => {
    useEffect(() =>{
        window.scrollTo(0,0);
    }, []);
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




const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log('IntersectionObserver triggered:', entry);

        if (entry.isIntersecting) {
          setIsSectionVisible(true);
        } else {
          setIsSectionVisible(false);
        }
      });
    });

    const hiddenSectionL = document.querySelector('.hiddenSectionL');
    if (hiddenSectionL) {
      observer.observe(hiddenSectionL);
    }

    const hiddenSectionR = document.querySelector('.hiddenSectionR');
    if (hiddenSectionR) {
      observer.observe(hiddenSectionR);
    }

    const hiddenSectionB = document.querySelector('.hiddenSectionB');
    if (hiddenSectionB) {
      observer.observe(hiddenSectionB);
    }

    return () => {
      observer.disconnect();
    };
}, []);


const [isScrolled, setIsScrolled] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // if (scrollY > 400) {
            // if (scrollY > 50) {
            if (scrollY > 750) {
            // if (scrollY > 1700) {
                setIsScrolled(true);


                setIsSectionVisible(false);
            } else {
                setIsScrolled(false);
                setIsSectionVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
return (
    <div className="home">
            {/*<Navbar />*/}
            <div className="homeContainer">
                <div className="homeTop">
            {/* <div className={`hiddenSectionL ${isSectionVisible ? 'show' : ''}`}> */}
                    <div className="homeTopText">
                    {/* <section className={`hiddenSectionL ${isSectionVisible ? 'show' : ''}`}> */}
                            <h1>Premier éco-college de martinique !</h1>
                    {/* </section> */}
                    </div>
                    {/* </div> */}

                    {/* <section className={`hiddenSectionL ${isSectionVisible ? 'show' : ''}`}> */}
                    
                    <div id="img1" className={`imgSection hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                        <img src="/fblob.png" />
                    </div>
                    <div id="img2" className={`imgSection hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                        <img src="/imgclg2.png" />
                    </div>
                    <div id="img3" className={`imgSection hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                        <img src="/tbasketblob.png" />
                    </div>

                    {/* <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="white" fill-opacity="1" d="M0,0L40,42.7C80,85,160,171,240,224C320,277,400,299,480,293.3C560,288,640,256,720,218.7C800,181,880,139,960,128C1040,117,1120,139,1200,160C1280,181,1360,203,1400,213.3L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
                    </svg> */}
                    {/* <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="white" fill-opacity="1" d="M0,224L1440,288L1440,320L0,320Z"></path>
                    </svg> */}
                    <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        {/* <path fill="white" fill-opacity="1" d="M0,224L60,213.3C120,203,240,181,360,170.7C480,160,600,160,720,176C840,192,960,224,1080,229.3C1200,235,1320,213,1380,202.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path> */}
                        <path fill="white" fillOpacity="1" d="M0,224L60,213.3C120,203,240,181,360,170.7C480,160,600,160,720,176C840,192,960,224,1080,229.3C1200,235,1320,213,1380,202.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                    </svg>

                    {/* </section> */}
                </div>

                    <div className={`homeMain ${isScrolled ? 'scrolled' : ''}`}>
                {/* <div className="homeMain"> */}
                {/* <section className={`hiddenSectionL ${isSectionVisible ? 'show' : ''}`}> */}
                    {/* <div className="homeButtons"> */}
                    <div className={`homeButtons hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                        <div className="buttonTop">
                            <button id="button1" className={`imgSection hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                                <a href="https://colibri.ac-martinique.fr/auth/saml/wayf?callBack=https%3A%2F%2Fcolibri.ac-martinique.fr%2F#/">ENT</a>
                            </button>
                            <button id="button2" className={`imgSection hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                                <a href="https://www.pearltrees.com/">MON ORGANISATION</a>
                            </button>
                            <button id="button3" className={`imgSection hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                                <Link to={`/projets/?category_id=2`} >
                                    PROJETS
                                </Link>
                            </button>
                        </div>
                        <div className="buttonBottom">
                            <button id="button4" className={`imgSection2 hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                                <Link to={`/evenements/?category_id=6`} >
                                    EVENEMENTS
                                </Link>
                            </button>
                            <button id="button5" className={`imgSection2 hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                                <Link to={`/actualites`} >
                                    ACTUALITES
                                </Link>
                            </button>
                            <button id="button6" className={`imgSection2 hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                                <Link to={`/orientation/?category_id=7`} >
                                    ORIENTATION
                                </Link>
                            </button>
                        </div>
                            <hr/>

                    </div>

                {/* </section> */}
                    {/* <div className="firstIllustration">
                        <img src="/leaves.png" />
                    </div> */}
                     {/* <section className={`hiddenSectionL ${isSectionVisible ? 'show' : ''}`}> */}
                    <div className={`firstIllustration imgSection hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                        {/* <img src="/chapELV.png" /> */}
                         <img src="/leaves.png" />
                    </div>
                    {/* </section> */}
                    {/* </div> */}

                    <div className="homeNews">
                    {/* <div className={`homeNews ${isScrolled ? 'scrolled' : ''}`}> */}
                        {/* <section className={`hiddenSectionL ${isSectionVisible ? 'show' : ''}`}> */}
                        <div className="homeNewsTitle">
                            <h2>ACTUALITÉS</h2>
                        </div>
                        <div className="homeNewsBox">
                            <div className="homeNewsTop">
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

                        {/* </section> */}
                    </div>
                    {/* <div className={`compasHome hiddenSectionL ${isSectionVisible ? 'show' : ''}`}> */}
                    <div className="compasHome">
                    {/* <div> */}
                        {/* <img className="bounce2" src="/illustrationcompasELV copie.png" /> */}
                        <img className="bounce2" src="/feuilles.png" />
                    {/* </div> */}
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