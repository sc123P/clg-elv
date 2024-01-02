import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Post from '../components/Post';
import Pagination from '../components/Pagination';
import { IoIosArrowDown } from 'react-icons/io';
import axios from 'axios';
import GoBackButton from '../components/GoBackButton';

const Projects = () => {
    const [open, setOpen] = useState(false);
    const dropdownMenuRef = useRef(null);
    useEffect(() =>{
        window.scrollTo(0,0);
    }, []);

    useEffect(() => {
        // Ajout d'un gestionnaire d'événements pour fermer le dropdown-menu lors du clic à l'extérieur
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
    return (
        <div className="projects">
            <div className="projectsContainer">
                <div className="projectsTop">
                    <div className="projectsTopText">
                        <h1>PROJETS</h1>
                    </div>
                    <div className="projectsTopBlack">
                        <img src="/trianglebgcopie2.png" alt="" />
                    </div>
                </div>
                <GoBackButton />
        <div className="dropdownP">
            <div className='menu-trigger' onClick={()=>{setOpen(!open)}} ref={dropdownMenuRef}>
                <p>Tous les projets</p>
                <IoIosArrowDown />
            </div>

            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                <div className="dropdownList">
                    <ul className="item">
                        <li className="itemContent">
                            <Link to="/projets/projets etablissements">
                                <span className="span">
                                    projets établissements
                                </span>
                            </Link>
                        </li>
                        <li className="itemContent">
                            <Link to="/projets/projets pedagogiques">
                                <span className="span">
                                    projets pédagogiques
                                </span>
                            </Link>
                        </li>
                        <li className="itemContent">
                            <Link to="/projets/projets educatifs">
                                <span className="span">
                                    projets éducatifs
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
                <Pagination />
            </div>
        </div>
    );
};

export default Projects;