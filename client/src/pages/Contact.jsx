import React, { useEffect } from 'react';
import { MdLocationPin } from 'react-icons/md';
import { MdPhone } from 'react-icons/md';
import { MdEmail } from 'react-icons/md';
import { FaXTwitter } from "react-icons/fa6";
import GoBackButton from '../components/GoBackButton';

const Contact = () => {
    useEffect(() =>{
        window.scrollTo(0,0);
    }, []);
    return (
        <div className="contact">
            <div className="contactContainer">
                <div className="contactTop">
                    <div className="contactTopText">
                        <h1>CONTACT</h1>
                    </div>
                    <div className="contactTopBlack">
                        <img src="/motifsELV 3 copie.png" alt="" />
                    </div>
                </div>

                <GoBackButton />
                <div className="contactMain">
                    <div className="left">
                        <div className="infos">
                            <div className="info">
                                <MdLocationPin className="icon" color={"#FFD100"} />
                                <div className="text">
                                    <h3>Adresse</h3>
                                    <p>
                                        Collège Edmond Lucien Valard - H354+965, Cité la Carreau, Saint-Esprit 97270, Martinique
                                    </p>
                                </div>
                            </div>

                            <div className="info">
                                <MdPhone className="icon" color={"#6495C0"} />
                                <div className="text">
                                    <h3>Téléphone</h3>
                                    <p>
                                    +596 596 56 61 66
                                    </p>
                                </div>
                            </div>

                            <div className="info">
                                <MdEmail className="icon" color={"#78AB4D"} />
                                <div className="text">
                                    <h3>Mail</h3>
                                    <p>
                                    ce.9720020p@ac-martinique.fr
                                    </p>
                                </div>
                            </div>

                            <div className="info">
                                <a href="https://twitter.com/edmondvalard" className="info">
                                    <FaXTwitter className="icon" />
                                    <div className="text">
                                        <h3>X (ex-Twitter)</h3>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;