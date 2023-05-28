import React from 'react';
import Navbar from '../components/Navbar';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Home = () => {
    return (
        <div className="home">
            <Navbar />
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
                            <button id="button1">ENT</button>
                            <button id="button2">MON ORGANISATION</button>
                            <button id="button3">PROJETS</button>
                        </div>
                        <div className="buttonBottom">
                            <button id="button4">EVENEMENTS</button>
                            <button id="button5">ACTUALITES</button>
                            <button id="button6">ORGANISATION</button>
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
                                <div className="homeNewsBoxLeft">
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
                                </div>
                            </div>

                            <div className="homeNewsBottom">
                                <div className="button">
                                    <button className="newsButton">Plus d'actualités</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="compasHome">
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