import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    //const [active, setActive] = useState(false);

    return (
    //<div className={active ? "navbar active" : "navbar"}>

    <div className="navbar">
        <div className="navbarContainer">
                <div className="navbarLogo"><img src="/V2logoELV26.png" /></div>

                <div className="navigation">
                    <ul>
                        <li>
                            <NavLink exact="true" to="/" className="isActive" >
                                <span>Acceuil</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink exact="true" to="/actualites" className="isActive" >
                                <span>Actualités</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink exact="true" to="/nous_connaitre" className="isActive" >
                                <span>Nous connaître</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink exact="true" to="/contact" className="isActive" >
                                <span>Contact</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="navOthersLogo">
                    {/*<img src="/LogoAC_MARTINIQUE - Fond transparent.png" />*/}
                    <img src="/Académie_de_Martinique.svg.png" />
                    <img src="/logo-eco-ecole.png" />
                </div>
            </div>

        </div>
    );
};

export default Navbar;