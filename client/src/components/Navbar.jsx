import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { SlLogin } from 'react-icons/sl';
import { SlLogout } from 'react-icons/sl';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const Navbar = () => {
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const dropdownMenuRef = useRef(null);
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
    const [menu_class, setMenuClass] = useState("menu hidden");
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    const handleMenuClick = (event) => {
        const { target, currentTarget } = event;
        const text = target.textContent;
        const className = target.className;
        console.log('Text:', text);
        console.log('Class name:', className);
        setOpen(false);
      };
      const handleLogout = async () => {
        await axiosInstance.post('/api/auth/logout', null);
        setCurrentUser(null);
        setOpen(false);
      };

      useEffect(() => {
        // Ajouter un gestionnaire d'événements pour fermer le dropdown-menu lors du clic à l'extérieur
        function handleClickOutside(event) {
            if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);




    const updateMenu = () => {
        if(isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }
        setIsMenuClicked(!isMenuClicked)
    }
    
    const closeMobileMenu = () => setOpen(false);

    
    return (
        <div className="navbar">
        <div className="navbarContainer">
            <div className="burgerM">
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                </div>
                <div className={menu_class}>
                    <ul className="menuBurger-list">
                            <li onClick={updateMenu}>
                                <NavLink exact="true" to="/" className="isActive" >
                                    <span>Acceuil</span>
                                </NavLink>
                            </li>

                            <li onClick={updateMenu} >

                                <NavLink exact="true" to="/actualites" className="isActive" >
                                    <span>Actualités</span>
                                </NavLink>
                            </li>

                            <li onClick={updateMenu}>
                                <NavLink exact="true" to="/nous_connaitre" className="isActive" >
                                    <span>Nous connaître</span>
                                </NavLink>
                            </li>

                            <li onClick={updateMenu}>
                                <NavLink exact="true" to="/contact" className="isActive" >
                                    <span>Contact</span>
                                </NavLink>
                            </li>

                    <div className="navOthersLogoBurger">
                        <img src="acdemq 2.png" alt="" />
                        <img src="/logo-eco-ecole.png" />
                    </div>
                    </ul>
                </div>
                
            </div>

                <div className="navbarLogo">
                    <NavLink to="/">
                        <img src="/V2logoELV26.png" />
                    </NavLink>
                </div>

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

                    <div className="dropdown">
                        <div className='menu-trigger' onClick={() => {setOpen(!open);} } ref={dropdownMenuRef}>
                            <BsFillPersonFill />
                        </div>
                                <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                                    <div className="dropdownList">
                                        <ul className="item">
                                            {currentUser ? 
                                            (<>
                                                <li id="itemContentFirst">
                                                    Compte: {currentUser?.username}
                                                </li>
                                            </>) : (<></>)}
                                            
                                            <li className="itemContent" onClick={handleMenuClick}>
                                                {currentUser ? 
                                                    (<> <SlLogout /><span onClick={handleLogout}>Déconnexion</span> </>) 
                                                    : (<> <Link to="/connexion"><span className="span"><SlLogin />Connexion</span></Link> </>)}
                                            </li>

                                            {currentUser ?
                                                (<>
                                                    <li className="itemContent">
                                                        
                                                        <Link to={`/write`}>
                                                            <span className="span">
                                                                Rédiger un article
                                                            </span> 
                                                        </Link>
                                                    </li>
                                                </>) : (<></>)
                                            }
                                            

                                        </ul>
                                    </div>
                                </div>
                    </div>                    
                </div>
                <div className="navOthersLogo">
                    <img src="acdemq 2.png" alt="" />
                    <img src="/logo-eco-ecole.png" />
                </div>
            </div>

        </div>
    );
};

export default Navbar;