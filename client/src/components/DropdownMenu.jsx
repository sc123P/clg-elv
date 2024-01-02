import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';

const DropdownMenu = () => {
    const [open, setOpen] = useState(false);

    
    return (
        <div className="dropdownP">
            <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
                <p>Tous les projets</p>
                <IoIosArrowDown />
            </div>
            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                <div className="dropdownList">
                    <ul className="item">
                        <li className="itemContent">
                            <Link to="/subcategories/projets-etablissements">
                                <span className="span">
                                    projets établissements
                                </span>
                            </Link>
                        </li>
                        <li className="itemContent">
                            <Link to="/subcategories/projets-pedagogiques">
                                <span className="span">
                                    projets pédagogiques
                                </span>
                            </Link>
                        </li>
                        <li className="itemContent">
                            <Link to="/subcategories/projets-educatifs">
                                <span className="span">
                                    projets éducatifs
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DropdownMenu;