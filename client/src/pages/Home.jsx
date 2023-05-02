import React from 'react';
import Navbar from '../components/Navbar';

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

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;