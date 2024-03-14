import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from "moment";
import axios from 'axios';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Home = () => {
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    useEffect(() =>{
        window.scrollTo(0,0);
    }, []);
    moment.updateLocale('fr', {
        months : [
            "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet",
            "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ]
    });
    const [latestPost, setLatestPost] = useState(null);
    useEffect(() => {
        // Fonction pour récupérer les articles associés à la sous-catégorie depuis le backend
        const latestPost = async () => {
          try {
            const response = await axiosInstance.get(`/api/posts/latest`);
            console.log('Response from API:', response.data);
            setLatestPost(response.data);
          } catch (error) {
            console.error('Erreur lors de la récupération du dernier article :', error);
          }
        };
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
            if (scrollY > 750) {
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
            <div className="homeContainer">
                <div className="homeTop">
                    <div className="homeTopText">
                    <div className={`homeTopText hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                        <h1>Premier éco-college de martinique !</h1>
                    </div>
                    </div>
                    
                    <div id="img1" className={`imgSection hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                        <img src="/fblob.png" />
                    </div>
                    <div id="img2" className={`imgSection hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                        <img src="/imgclg2.png" />
                    </div>
                    <div id="img3" className={`imgSection hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                        <img src="/tbasketblob.png" />
                    </div>

                    <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="white" fillOpacity="1" d="M0,224L60,213.3C120,203,240,181,360,170.7C480,160,600,160,720,176C840,192,960,224,1080,229.3C1200,235,1320,213,1380,202.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                    </svg>
                </div>

                    <div className={`homeMain ${isScrolled ? 'scrolled' : ''}`}>
                    <div className={`cards homeButtons hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                            <button id="button1" className={`card imgSection hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                                <a href="https://colibri.ac-martinique.fr/auth/saml/wayf?callBack=https%3A%2F%2Fcolibri.ac-martinique.fr%2F#/">ENT</a>
                            </button>
                            <button id="button2" className={`card imgSection hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                                <a href="https://www.pearltrees.com/">MON ORGANISATION</a>
                            </button>

                            <button id="button3" className={`card imgSection hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                                <Link to={`/projets/?category_id=2`} >
                                    PROJETS
                                </Link>
                            </button>
                            <button id="button4" className={`card imgSection hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                                <Link to={`/evenements/?category_id=6`} >
                                    EVENEMENTS
                                </Link>
                            </button>
                            <button id="button5" className={`card imgSection hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                                <Link to={`/actualites`} >
                                    ACTUALITES
                                </Link>
                            </button>
                            <button id="button6" className={`card imgSection hiddenSectionL ${isSectionVisible ? 'show' : ''}`}>
                                <Link to={`/orientation/?category_id=7`} >
                                    ORIENTATION
                                </Link>
                            </button>
                    </div>
                    <span className='bottomLine'>
                        <hr/>
                    </span>
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