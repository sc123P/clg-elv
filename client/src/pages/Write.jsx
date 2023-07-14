import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {AiFillPlusCircle} from 'react-icons/ai';
import axios from 'axios';
//import { useLocation } from 'react-router';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

const Write = () => {
    //const { id } = useParams();
    //const location = useLocation();
    //const state = location.state;
    
    const state = useLocation().state;
    const [value, setValue] = useState(state?.title || "");
    const [title, setTitle] = useState(state?.desc || "");
    const [file, setFile] = useState(null);
    //const [category_id, setCategory_id] = useState(state?.category_id || "");
    const [category_id, setCategory_id] = useState([]);

    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        // Mettre à jour les catégories sélectionnées en fonction des sous-catégories
        const updatedSelectedCategories = selectedCategories.filter(
          (categoryId) => categoryId === '2' || !['5', '6', '7'].includes(categoryId)
        );
      
        ['5', '6', '7'].forEach((categoryId) => {
          if (selectedCategories.includes(categoryId)) {
            updatedSelectedCategories.push(categoryId);
          }
        });
      
        if (selectedCategories.length !== updatedSelectedCategories.length) {
          setSelectedCategories(updatedSelectedCategories);
        }
      }, [selectedCategories]);


    //const [value, setValue] = useState(state ? state.title : "");
    //const [title, setTitle] = useState(state ? state.desc : "");
    //const [category_id, setCategory_id] = useState(state ? state.category_id : "");

    console.log(state);

    const upload = async () => {
        try {
          if (!file) {
            return null; // Retourner null si le fichier est nul
          }
          const formData = new FormData();
          for (let i = 0; i < file.length; i++) {
            formData.append("files", file[i]);
          }
          const res = await axios.post("/api/upload", formData);
          return res.data;
        } catch (err) {
          console.log(err);
          return null; // Retourner null en cas d'erreur
        }
      };

    const handleClick = async e=>{
        e.preventDefault()
        //const imgUrl = upload()
        const imgUrl = await upload()

        try{
            state ? 
            await axios.put(`/api/posts/${state.id}`, {
                title, 
                desc: value, 
                category_id, 
                img: file ? imgUrl: ""
            }) 
            : //await axios.post(`/api/posts/${state.id}`, {
                await axios.post("/api/posts", {
                title, 
                desc: value, 
                //category_id,
                //category_id: category_id.toString(),
                category_id: selectedCategories.toString(), 
                img: file ? imgUrl: "",
                //date: moment(Date.now()).format("HH:mm:ss DD-MM-YYYY")
                date: moment(Date.now()).format("YYYY-MM_DD HH:mm:ss")
            });
        }catch(err){
            console.log(err)
        };
    };
    //const handleChange = (e) =>{
    //    setFile(e.target.files)
    //};

    //const handleChange = (e) => {
    //    const categoryId = e.target.value;
    //    if (e.target.checked) {
    //      setCategory_id((prevCategories) => [...prevCategories, categoryId]);
    //    } else {
    //      setCategory_id((prevCategories) =>
    //        prevCategories.filter((id) => id !== categoryId)
    //      );
    //    }
    //  };
    //const handleChange = (e) => {
    //    const categoryId = e.target.value;
    //    if (e.target.checked) {
    //      setSelectedCategories((prevCategories) => [...prevCategories, categoryId]);
    //    } else {
    //      setSelectedCategories((prevCategories) =>
    //        prevCategories.filter((id) => id !== categoryId)
    //      );
    //    }
    //  };
    const handleCheckboxClick = (e) => {
        const categoryId = e.target.value;
        if (e.target.checked) {
          setSelectedCategories((prevCategories) => [...prevCategories, categoryId]);
        } else {
          setSelectedCategories((prevCategories) =>
            prevCategories.filter((id) => id !== categoryId)
          );
        }
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

                            {/*<input style={{display: "none"}} type="file" id="file" name="file" multiple={true} onChange={handleChange} />*/}
                            <input style={{display: "none"}} type="file" id="file" name="file" multiple={true} onChange={(e) => setFile(e.target.files[0])} />
                            <label htmlFor="file" className="iconsText">Ajouter une image <AiFillPlusCircle size={24} className="icons" /> </label>

                            <div className="center">
                                <button onClick={handleClick}>Publier</button>
                            </div>
                        </div>
                            

                        <div className="item">
                            <h3>Catégories</h3>
                            <div className="cat">
                                {/*<input type="checkbox" checked={category_id === "1" } id="1" name="category_id" value={1} onChange={e=>setCategory_id(e.target.value)} />*/}
                                <input type="checkbox" checked={selectedCategories.includes('1')} id="1" name="category_id" value={1} onChange={handleCheckboxClick} />
                                <label htmlFor="1">Actualités</label>
                            </div>

                            <div className="cat">
                                <input type="checkbox" checked={selectedCategories.includes('2')} id="2" name="category_id" value={2} onChange={handleCheckboxClick} />
                                <label htmlFor="2">Projets</label>
                            </div>

                            <div className="cat">
                                <input type="checkbox" checked={selectedCategories.includes('5')} id="5" name="category_id" value={5} onChange={handleCheckboxClick} />
                                <label htmlFor="5">Projets établissements</label>
                            </div>

                            <div className="cat">
                                <input type="checkbox" checked={selectedCategories.includes('6')} id="6" name="category_id" value={6} onChange={handleCheckboxClick} />
                                <label htmlFor="6">Projets pédagogiques</label>
                            </div>

                            <div className="cat">
                                <input type="checkbox" checked={selectedCategories.includes('7')} id="7" name="category_id" value={7} onChange={handleCheckboxClick} />
                                <label htmlFor="7">Projets éducatifs</label>
                            </div>

                            <div className="cat">
                                <input type="checkbox" checked={selectedCategories.includes('3')} id="3" name="category_id" value={3} onChange={handleCheckboxClick} />
                                <label htmlFor="3">Évenements</label>
                            </div>

                            <div className="cat">
                                <input type="checkbox" checked={selectedCategories.includes('4')} id="4" name="category_id" value={4} onChange={handleCheckboxClick} />
                                <label htmlFor="4">Orientation</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Write;