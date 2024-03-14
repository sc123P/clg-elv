import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {AiFillPlusCircle} from 'react-icons/ai';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { MultiSelect } from 'react-multi-select-component';
import EditorToolbar, { modules, formats } from "../components/EditorToolbar";
import { Link, useNavigate, useParams } from 'react-router-dom';
import GoBackButton from '../components/GoBackButton';

const Write = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});
  useEffect(() =>{
    window.scrollTo(0,0);
}, []);
  //CHANGEMENT-----------------------------------------------------
  const { id } = useParams();
  const [post, setPost] = useState({
    title: "",
    desc: "",
    category_id: "",
    img: "",
  });
  //CHANGEMENT-----------------------------------------------------
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || '');
  const [value, setValue] = useState(state?.desc || '');
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(state?.category_id || []);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();


  const toolbarOptions = [
    { 'header': [1, 2, 3, false] },
    'bold',
    'italic',
    'underline',
    'blockquote',
    { 'list': 'ordered' },
    { 'list': 'bullet' },
    { 'indent': '-1' },
    { 'indent': '+1' },
    { 'color': [] },
    { 'background': [] },
    'link',
    'image',
    // 'video'
]

//CHANGEMENT2-----------------------------------------------------
useEffect(() => {
  if (!state) {
  // Récupérer les détails de l'article à partir de l'API
  axiosInstance.get(`/api/posts/${state}`).then((response) => {
    const postData = response.data;
    setPost({
      title: postData.title,
      desc: postData.desc,
      category_id: postData.category_id,
      img: postData.img,
    });
  });
}
}, [id]);

const handleChange = (e) => {
  const { name, value } = e.target;
  setPost({
    ...post,
    [name]: value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  // console.log('ID de l\'article à mettre à jour :', state.id);

  if (!state) {
    // Gérer le cas où state est null ou non défini en créant un nouvel article
    const articleData = {
      title,
      desc: value,
      category_id: selectedCategoryIds,
      img: file ? imgUrl : "",
    };

    try {
      const response = await axiosInstance.post('/api/posts', {
        title,
        desc: value,
        category: selectedCategoryIds,
        img: file ? imgUrl : "",
        date: moment(Date.now()).locale('fr').format('YYYY-MM-DD HH:mm:ss'),
      });

      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  } else {
    // Gérer le cas où state existe en mettant à jour l'article existant
    const articleData = {
      title,
      desc: value,
      category_id: selectedCategoryIds,
      img: file ? imgUrl : "",
    };

    try {
      const response = await axiosInstance.put(`/api/posts/${state.id}`, articleData);
      console.log(response.data);
      navigate(`/post/${state.id}`);
    } catch (error) {
      console.error(error);
    }
  }
};
//CHANGEMENT2-----------------------------------------------------




  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/api/posts/categories');
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


const selectedCategoryIds = [];
selectedCategories.forEach((category) => {
  if (category.value === "Projets") {
    selectedCategoryIds.push(category.value); // Ajoute la catégorie parente
    ["Projets établissements", "Projets pédagogiques", "Projets éducatifs"].forEach((subCategory) => {
      if (selectedCategories.some((c) => c.value === subCategory)) {
        selectedCategoryIds.push(subCategory); // Ajoute les sous-catégories sélectionnées
      }
    });
  } else {
    selectedCategoryIds.push(category.value); // Ajoute les autres catégories
  }
});

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
      const res = await axiosInstance.post("/api/upload", formData);
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
      // const maxLength = 15000;
      // if (value.length > maxLength) {
      //   setValue(value.substring(0, maxLength));
      // }
      if (state) {
        response = await axiosInstance.put(`/api/posts/${state.id}`, {
          // response = await axios.put(`/api/posts/${id}`, {
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
        response = await axiosInstance.post('/api/posts', {
          title,
          desc: value,

          category: selectedCategoryIds,
          // category: selectedCategories.map((category) => category.value),
          img: file ? imgUrl : "",
          //img: imgUrl,
          //img: imgUrl.join(','),
          //img: files.join(','),
          //img: file,
          date: moment(Date.now()).locale('fr').format('YYYY-MM-DD HH:mm:ss'),
        });
      }
      
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    navigate('/');
  };
    return (
        <div className="write">
                    <GoBackButton />
            <div className="writeContent">
                <div className="writeTop">
                    <div className="writeTopText">
                        <h3>ESPACE ADMINISTRATEUR</h3>
                    </div>
                    <div className="hrAdmin">
                        <hr />
                    </div>
{/*                    <div className="writeTopBlack">
                        <img src="/circleswhite.png" />
                    </div>*/}
                </div>

                <div className="writeMain">
                    <div className="mainContent">
                        {/*<input type="text" value={title} placeholder="Titre" onChange={e=>setTitle(e.target.value)} />*/}
                        <input type="text" value={title} placeholder="Titre" onChange={e=>setTitle(e.target.value)} />
                        {/*<input type="text" value={value} placeholder="Titre" onChange={setValue} />*/}
                        <div className="editorContainer">
                            {/*<EditorToolbar toolbarId={'t1'}/>*/}
                            <ReactQuill className="editor" theme="snow" value={value} onChange={setValue}
                            
                            formats={formats}
                            modules={{
                              toolbar: toolbarOptions,
                              clipboard: {
                                  matchVisual: false
                              }
                          }}
                            />
                            {/*<ReactQuill className="editor" theme="snow" value={title} onChange={e=>setTitle(e.target.value)} />*/}
                        </div>
                    </div>
                    <div className="menuAdmin">
                        <div className="item">
                            <h3>Publier</h3>
                            <span>
                                <b>Statut: </b> Brouillon
                            </span>
                            
                            <input type="file" id="file" name="file" multiple onChange={(e) => setFile(e.target.files[0])} />
                            {/*<label htmlFor="file" className="iconsText">Ajouter une image<AiFillPlusCircle size={24} className="icons" /></label>*/}
                            <label style={{ display: "none" }} htmlFor="file" className="iconsText">Ajouter une image<AiFillPlusCircle size={24} className="icons" /></label>
                            {/*<input type="file" id="files" name="files" multiple onClick={(e) => setFiles(e.target.files)} />*/}

                            <div className="center">
                                { progress.started && <progress max="100" value={progress.pc}></progress> }
                                { msg && <span>{msg}</span> }
                                  {/* <button onClick={handleClick}> */}
                                  <button onClick={handleSubmit}>
                                    {/* <Link to={`/`} className="button" onClick={handleClick}> */}
                                      Publier
                                    {/* </Link> */}
                                  </button>
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