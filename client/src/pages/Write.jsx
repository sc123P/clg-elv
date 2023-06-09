import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {AiFillPlusCircle} from 'react-icons/ai';

const Write = () => {
    const [value, setValue] = useState('');

    console.log(value)
    return (
        <div className="write">
            <div className="writeContent">
                <div className="writeTop">
                    <div className="writeTopText">
                        <h3>ESPACE ADMINISTRATEUR</h3>
                    </div>
                    <div className="hr">
                        <hr />
                    </div>
{/*                    <div className="writeTopBlack">
                        <img src="/circleswhite.png" />
                    </div>*/}
                </div>

                <div className="writeMain">
                    <div className="mainContent">
                        <input type="text" placeholder="Titre" />
                        <div className="editorContainer">
                            <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
                        </div>
                    </div>
                    <div className="menu">
                        <div className="item">
                            <h3>Publier</h3>
                            <span>
                                <b>Statut: </b> Brouillon
                            </span>

                            <input style={{display: "none"}} type="file" id="file" name="" multiple="true" />
                            <label htmlFor="file" className="iconsText">Ajouter une image <AiFillPlusCircle size={24} className="icons" /> </label>
                        </div>
                        <div className="item">
                            <h3>Catégories</h3>
                            <div className="cat">
                                <input type="checkbox" id="actualites" name="cat" checked />
                                <label htmlFor="actualites">Actualités</label>
                            </div>

                            <div className="cat">
                                <input type="checkbox" id="projets_etablissements" name="cat" />
                                <label htmlFor="projets_etablissements">Projets établissements</label>
                            </div>

                            <div className="cat">
                                <input type="checkbox" id="projets_pedagogiques" name="cat" />
                                <label htmlFor="projets_pedagogiques">Projets pédagogiques</label>
                            </div>

                            <div className="cat">
                                <input type="checkbox" id="projets_educatifs" name="cat" />
                                <label htmlFor="projets_educatifs">Projets éducatifs</label>
                            </div>

                            <div className="cat">
                                <input type="checkbox" id="evenements" name="cat" />
                                <label htmlFor="evenements">Évenements</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Write;