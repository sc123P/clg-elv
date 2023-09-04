import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footerContainer">
                <div className="list">
                    {/* <ul>
                        <div className="footerList">
                            <li> <a href="https://colibri.ac-martinique.fr/auth/saml/wayf?callBack=https%3A%2F%2Fcolibri.ac-martinique.fr%2F#/">ENT</a></li>
                            <li> <a href="https://www.pearltrees.com/">Mon organisation</a></li>
                            <Link to={`/projets/?category_id=2`} >
                                <li>Projets</li>
                            </Link>
                        </div>
                        <div className="footerList">
                            <Link to="/projets/projets etablissements">
                                <li>Projets établissements</li>
                            </Link>
                            <Link to="/projets/projets pedagogiques">
                                <li>Projets pédagogiques</li>
                            </Link>
                            <Link to="/projets/projets educatifs">
                                <li>Projets éducatifs</li>
                            </Link>
                        </div>
                        <div className="footerList">
                            <Link to={`/evenements/?category_id=6`} >
                                <li>Évènements</li>
                            </Link>
                            <Link to={`/actualites`} >
                                <li>Actualités</li>
                            </Link>
                            <Link to={`/orientation/?category_id=7`} >
                                <li>Orientation</li>
                            </Link>
                        </div>
                    </ul> */}
                </div>
            </div>
        </div>
    );
};

export default Footer;