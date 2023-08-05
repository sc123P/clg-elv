import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {AiFillPlusCircle} from 'react-icons/ai';
import axios from 'axios';
//import { useLocation } from 'react-router';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { MultiSelect } from 'react-multi-select-component';

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || '');
  const [title, setTitle] = useState(state?.desc || '');
  //const [files, setFiles] = useState(null);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(state?.category_id || []);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/posts/categories');
        const categoriesData = response.data;
        setCategories(categoriesData);
        console.log('Categories:', categoriesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const updatedSelectedCategories = selectedCategories.filter(
      (category) =>
        category === 'Projets' ||
        !['Projets établissements', 'Projets pédagogiques', 'Projets éducatifs'].includes(category)
    );

    ['Projets établissements', 'Projets pédagogiques', 'Projets éducatifs'].forEach((category) => {
      if (selectedCategories.includes(category)) {
        updatedSelectedCategories.push(category);
      }
    });

    if (selectedCategories.length !== updatedSelectedCategories.length) {
      setSelectedCategories(updatedSelectedCategories);
    }
  }, [selectedCategories]);

  if (!categories || categories.length === 0) {
    return <div>Loading...</div>;
  }

  const options = categories.map((category) => ({
    label: category.category,
    value: category.id,
  }));
  console.log('Options:', options);

  const handleCategoryChange = (selectedOptions) => {
    console.log('Selected options:', selectedOptions);
    setSelectedCategories(selectedOptions);
  };

  const addCategory = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      if (!prevCategories.includes(categoryId)) {
        return [...prevCategories, categoryId];
      }
      return prevCategories;
    });
  };

  const removeCategory = (categoryId) => {
    setSelectedCategories((prevCategories) => prevCategories.filter((cat) => cat !== categoryId));
  };

  

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/api/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (event) => {
    // prevent redirect
    event.preventDefault();
  }
  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    console.log('Title:', title);
    console.log('Value:', value);
    console.log('Selected categories:', selectedCategories);
    console.log('File:', file);

    try {
      let response;
      if (state) {
        response = await axios.put(`/api/posts/${state.id}`, {
          title,
          desc: value,
          category: selectedCategories,
          img: file ? imgUrl : "",
          //img: imgUrls,
          //img: imgUrl.join(','),
          //img: files.join(','),
          //img: file,
        });
      } else {
        response = await axios.post('/api/posts', {
          title,
          desc: value,
          //category: selectedCategories,
          //category: selectedCategories,
          category: selectedCategories.map((category) => category.value),
          img: file ? imgUrl : "",
          //img: imgUrl,
          //img: imgUrl.join(','),
          //img: files.join(','),
          //img: file,
          date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        });
      }
      
      console.log(response.data);
    } catch (err) {
      console.log(err);
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
                            {/*<input style={{display: "none"}} type="file" id="file" name="file" multiple={true} onChange={(e) => setFile(e.target.files[0])} />*/}
                            {/*{images.map((imageUrl, index) => (
                              <img key={index} src={imageUrl} alt={`Uploaded ${index}`} />
                            ))}*/}
                            {/*<input style={{display: "none"}} type="file" id="file" name="file" multiple={true} onChange={(e) => setFile(e.target.files[0])} />*/}
                            {/*<input type="file" id="files" name="files" multiple onChange={(e) => setFiles(e.target.files)} />*/}

                            {/*<iframe name="dummyframe" id="dummyframe" style={{display: "none"}}></iframe>*/}
                            {/*<form action="/api/upload" method="post" encType="multipart/form-data" target="dummyframe">*/}
                            {/*<form action="/api/upload" method="post" encType="multipart/form-data" onSubmit={handleClick} target="dummyframe">*/}
                            {/*<form action="/api/upload" method="post" encType="multipart/form-data" target="dummyframe"></form>*/}
                            
                            
                            <input type="file" id="file" name="file" multiple onChange={(e) => setFile(e.target.files[0])} />
                            {/*<label htmlFor="file" className="iconsText">Ajouter une image<AiFillPlusCircle size={24} className="icons" /></label>*/}
                            <label style={{ display: "none" }} htmlFor="file" className="iconsText">Ajouter une image<AiFillPlusCircle size={24} className="icons" /></label>
                            {/*<input type="file" id="files" name="files" multiple onClick={(e) => setFiles(e.target.files)} />*/}

                            <div className="center">
                                { progress.started && <progress max="100" value={progress.pc}></progress> }
                                { msg && <span>{msg}</span> }
                                {/*<button onClick={handleImageUpload}>Enregistrer</button>*/}
                                {/*<button onClick={handleClick}>Publier</button>*/}
                                {/*<button type="submit">Enregistrer</button>*/}
                                <button onClick={handleClick}>Publier</button>
                            </div>
                            {/*</form>*/}
                        </div>
                            

                        <div className="item">
                            <h3>Catégories</h3>
                              <MultiSelect
                                options={options}
                                value={selectedCategories}
                                onChange={handleCategoryChange}
                                labelledBy="Sélectionnez une ou plusieurs catégories"
                                />
                              {/*{categories.map((category) => (
                                //    <div className="cat" key={category.id}>
                                //    <input
                                //        type="checkbox"
                                //        checked={selectedCategories.includes(category.id)}
                                //        //checked={isChecked2}
                                //        id={category.id}
                                //        //name={`cat_id_${category.id}`}
                                //        name={category.id}
                                //        value={category.id}
                                //        onChange={handleCheckboxClick}
                                //    />
                                //    <label htmlFor={category.id}>{category.category}</label>
                                //    </div>
                                //))}
                              */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Write;