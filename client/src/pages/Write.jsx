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
  const [file, setFile] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(state?.category_id || []);
  const [categories, setCategories] = useState([]);

  //nouveau changement
  //const [images, setImages] = useState([]);
  //nouveau changement

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
    //setSelectedCategories(selectedOptions.map((option) => option.value));
    setSelectedCategories(selectedOptions);
  };
  

  const upload = async () => {
    try {
      if (!file) {
        //return null;
        return [];
      }
      const formData = new FormData();
      const imgUrl = [];
      for (let i = 0; i < file.length; i++) {
        formData.append('file', file[i]);
        const res = await axios.post('/api/upload', formData);
        imgUrl.push(res.data);
      }

      //const res = await axios.post('/api/posts/upload', formData);
      //const res = await axios.post('/api/upload', formData);

      //const res = await axios.post('/upload', formData);
      //return res.data;
      return imgUrl;
    } catch (err) {
      console.log(err);
      //return null;
      return [];
    }
  };

  //const handleCheckboxClick = (e) => {
  //  const isChecked = e.target.checked;
  //  const categoryId = e.target.value;
  //  if (isChecked) {
  //    addCategory(categoryId);
  //  } else {
  //    removeCategory(categoryId);
  //  }
  //};

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

  const handleClick = async (e) => {
    e.preventDefault();
    console.log('Handling click...');

    console.log('Title:', title);
    console.log('Value:', value);
    console.log('Selected categories:', selectedCategories);
    console.log('File:', file);


    //const checkboxElements = document.querySelectorAll('input[name="category_id"]:checked');
    //const selectedCategories = Array.from(checkboxElements).map((element) => element.value);

    //const imgUrl = await upload();
    //const imgUrl = upload;
    //let imgUrl = '';
    let imgUrl = [];
    if (file && file.length > 0) {
      imgUrl = await upload();
    }

    try {
      let response;
      if (state) {
        response = await axios.put(`/api/posts/${state.id}`, {
          title,
          desc: value,
          category: selectedCategories,
          //img: file ? imgUrl : '',
          //img: imgUrl,
          img: imgUrl.join(','),
        });
      } else {
        response = await axios.post('/api/posts', {
          title,
          desc: value,
          //category: selectedCategories,
          //category: selectedCategories,
          category: selectedCategories.map((category) => category.value),
          //img: file ? imgUrl : '',
          //img: imgUrl,
          img: imgUrl.join(','),
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
                            <input style={{display: "none"}} type="file" id="file" name="file" multiple={true} onChange={(e) => setFile(e.target.files[0])} />
                            <label htmlFor="file" className="iconsText">Ajouter une image <AiFillPlusCircle size={24} className="icons" /> </label>

                            <div className="center">
                                <button onClick={handleClick}>Publier</button>
                            </div>
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