import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {AiFillPlusCircle} from 'react-icons/ai';
import axios from 'axios';
import { useLocation } from 'react-router';

const Write = () => {
    const state = useLocation().state;
    const [value, setValue] = useState(state?.title || "");
    const [title, setTitle] = useState(state?.desc || "");
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState(state?.category || "");

    const upload = async() =>{
        try{
            const formData = new FormData();
            for (let i=0; i < file.length; i++){
                formData.append("files", file[i]);
            }
            //formData.append("file", file);
            //formData.append("files", file[i]);
            const res = await axios.post("/api/upload", formData);
            return res.data
        }catch(err) {
            console.log(err);
        }
    }

    const handleClick = async e=>{
        e.preventDefault()
        const imgUrl = upload()

        try{
            
        }catch(err){
            console.log(err)
        }
    };
    const handleChange = (e) =>{
        setFile(e.target.files)
    };

    //console.log(value)
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
                        <input type="text" value={title} placeholder="Titre" onChange={e=>setTitle(e.target.value)} />
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

                            <input style={{display: "none"}} type="file" id="file" name="file" multiple={true} onChange={handleChange} />
                            <label htmlFor="file" className="iconsText">Ajouter une image <AiFillPlusCircle size={24} className="icons" /> </label>

                            <div className="center">
                                <button onClick={handleClick}>Publier</button>
                            </div>
                        </div>
                            

                        <div className="item">
                            <h3>Catégories</h3>
                            <div className="cat">
                                <input type="checkbox" id="actualites" name="cat" checked={category === news} onChange={e=>setCategory(e.target.value)} />
                                <label htmlFor="actualites">Actualités</label>
                            </div>

                            <div className="cat">
                                <input type="checkbox" id="projets_etablissements" name="cat" checked={category === establishment_projects} onChange={e=>setCategory(e.target.value)} />
                                <label htmlFor="projets_etablissements">Projets établissements</label>
                            </div>

                            <div className="cat">
                                <input type="checkbox" id="projets_pedagogiques" name="cat" checked={category === pedagogic_projects} onChange={e=>setCategory(e.target.value)} />
                                <label htmlFor="projets_pedagogiques">Projets pédagogiques</label>
                            </div>

                            <div className="cat">
                                <input type="checkbox" id="projets_educatifs" name="cat" checked={category === educational_projects} onChange={e=>setCategory(e.target.value)} />
                                <label htmlFor="projets_educatifs">Projets éducatifs</label>
                            </div>

                            <div className="cat">
                                <input type="checkbox" id="evenements" name="cat" checked={category === events} onChange={e=>setCategory(e.target.value)} />
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