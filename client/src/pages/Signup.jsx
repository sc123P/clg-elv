import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const Signup = () => {
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:"",
    });
    const [err, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = e =>{
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try{
            await axiosInstance.post('/api/auth/signup', inputs);
            navigate("/connexion");
        }catch(err) {
            setError(err.response.data)
        }
    }
    useEffect(() =>{
        window.scrollTo(0,0);
    }, []);
    return (
        <div className="signup">
            <div className="signupContent">
                <h1>Créer un compte</h1>
                <form className="form">
                    <input required type="text" placeholder="identifiant" name='username' onChange={handleChange} />
                    <input required type="email" placeholder="email" name='email' onChange={handleChange} />
                    <div className="inputIcon">
                        <input 
                        required 
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="mot de passe" 
                        name='password' 
                        onChange={handleChange} 
                        minLength="6"
                        className="inputIcon"
                        />
                        {passwordVisible ? (
                                            <FaEyeSlash
                                                className="icon"
                                                onClick={() => setPasswordVisible(false)}
                                            />
                                        ) : (
                                            <FaEye
                                                className="icon"
                                                onClick={() => setPasswordVisible(true)} />
                                        )}
                    </div>
                    <button onClick={handleSubmit}>S'identifier</button>
                    {err && <p>{err}</p>}
                    <span>Seul l'administrateur peut se connecter. <Link to="/connexion" >Connexion</Link></span>
                </form>
            </div>
        </div>
    );
};

export default Signup;