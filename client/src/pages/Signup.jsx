import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from "axios";

const Signup = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:"",
    });

    const handleChange = e =>{
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try{
            const res = await axios.post("/auth/signup", inputs)
            console.log(res)
        }catch(err) {
            console.log(err)
        }
    }
    return (
        <div className="signup">
            <div className="signupContent">
{/*                <div className="signupTitle">
                </div>*/}
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
                    <span>Seul l'administrateur peut se connecter. <Link to="/connexion" >Connexion</Link></span>
                </form>
            </div>
        </div>
    );
};

export default Signup;