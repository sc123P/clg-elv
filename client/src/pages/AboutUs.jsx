import React, { useEffect } from 'react';
import GoBackButton from '../components/GoBackButton';

const AboutUs = () => {
    useEffect(() =>{
        window.scrollTo(0,0);
    }, []);
    return (
        <div className="aboutUs">
            <div className="aboutUsContainer">
                <div className="aboutUsTop">
                    <div className="aboutUsTopText">
                        <h1>NOUS CONNAÎTRE</h1>
                    </div>
                    <div className="aboutUsTopBlack">
                        <img src="/motifsELV 3 copie.png" alt="" />
                    </div>
                </div>

                    <GoBackButton />
                <div className="aboutUsMain">
                    <div className="aboutUsMainContainer">
                        <h2>LE COLLEGE ET SON ENVIRONNEMENT</h2>
                        <p>Situé avant le bourg de la commune, le collège fut construit en 1981 sur les hauteurs du quartier “La Carreau”. Il tient son nom d’un ancien professeur et principal de l’établissement, M.Edmond Lucien Valard, connu pour sa notoriété.
                        Saint Esprit est une petite commune de 10113 habitants. Sa campagne, son bourg et ses maisons à l’architecture ancienne font d’elle une commune toute particulière.
                        </p>

                        <div className="img">
                            <div className="imgContainer1">
                                <img src="/mairie.png" alt="" />
                                <p className="p">La mairie</p>
                            </div>
                            <div className="imgContainer2">
                                <img src="/campagneSE 1.png" alt="" />
                                <p className="p">Une campagne verdoyante</p>
                            </div>
                        </div>
                        <div className="img2">
                            <img src="/imgmuseeSE.png" alt="" />
                            <p className="p">L’ancien collège situé au bourg est aujourd’hui le Musée des Arts et Traditions Populaires</p>
                        </div>

                        <h2>L’ORGANISATION DU COLLÈGE</h2>
                        <p>Le collège s’étend sur 7 hectares et compte une vingtaine de bâtiments.
                        Un plateau sportif moderne permet aux élèves de pratiquer de nombreuses activités.
                        </p>

                        <div className="img3">
                            <div className="imgContainer3">
                                <img className="long" src="imgpisteELV 1.png" alt="" />
                            </div>
                            <div className='imgContainer4'>
                                <img className="court" src="/imgfacadeclgELV 1.png" alt="" />
                            </div>

                            <div className="imgContainer5">
                                <img className="court" src="/imgcollege 4.png" alt="" />
                            </div>
                            <div className="imgContainer6">
                                <img className="long" src="/imgtr2ELV 1.png" alt="" />
                            </div>

                        </div>
                            <p>Le collège s’étend sur 7 hectares et compte une vingtaine de bâtiments.
                            Un plateau sportif moderne permet aux élèves de pratiquer de nombreuses activités.
                            
                            Le personnel du collège est composé de :<br /><br />
                            -1 principal, 1 principale adjointe et une adjointe gestionnaire<br />
                            -35 enseignants et 10 AESH<br />
                            -1 CPE et 11 AED<br />
                            -19 agents techniques<br />
                            -2 personnels administratifs<br />
                            <br />
                            Le collège accueille 390 élèves du lundi au vendredi de 7h30 à 11h30 et de 13h00 à 16h00. Ils peuvent se restaurer le midi à la cantine du collège. Le port de l’uniforme est obligatoire: haut blanc et pantalon ou jupe bleu ou noir.
                            La structure du collège est composée de 16 divisions à raison de 4 divisions par niveau. Une unité localisée d’inclusion scolaire (ULIS) complète cette structure en accueillant des élèves en situation de handicap.
                            </p>

                        <h2>LES PARTICULARITÉS DU COLLÈGE</h2>
                        <p>Le collège Edmond Lucien VALARD se singularise par son implication dans le développement durable.
                        <br />    
                        De nombreux projets sont mis en œuvre afin de sensibiliser et d’éduquer les élèves sur ce thème.
                        On peut y trouver par exemple un jardin de plantes médicinales, un arboretum ou encore des meubles fabriqués avec des matériaux de récupération. Plusieurs distinctions lui ont été décernées ces dernières années.
                        </p>
                        <div className="img4">
                            <img src="/imgarbre 1.png" alt="" />
                            <p>Des élèves en pleine plantation d’arbres endémique de Martinique</p>
                        </div>
                        <p>
                        En dépit de sa ruralité, ce collège propose à ses élèves des activités aquatiques et nautiques telles que la natation, le kayak ou encore la yole. Par ailleurs, le tennis de table, la danse, le basketball ainsi que le football sont des sports pratiqués dans le cadre de l’UNSS.
                        <br />
                        Le numérique est également mis en valeur au collège: le parc informatique est bien doté et la formation des élèves très soutenue.
                        </p>

                        <div className="img">
                            <div className="imgContainer1">
                                <img src="/imgsportELV 1.png" alt="" />
                            </div>
                            <div className="imgContainer2">
                                <img className="right" src="/imgyoleELV 1.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;