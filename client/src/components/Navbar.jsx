import React, { useState } from 'react';

const Navbar = () => {
    //const [active, setActive] = useState(false);

    return (
    //<div className={active ? "navbar active" : "navbar"}>
    <div className="navbar">
        <div className="navbarContainer">
                <div className="navbarLogo"><img src="/V2logoELV26.png" /></div>

                <div className="navigation">
                    <ul>
                        <li>Acceuil</li>
                        <li>Actualités</li>
                        <li>Nous connaître</li>
                        <li>Contact</li>
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