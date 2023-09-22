import React, { useContext, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import GoBackButton from '../components/GoBackButton';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [inputs, setInputs] = useState({
        username:"",
        password:"",
    });
    const [err, setError] = useState(null);
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);

    const handleChange = e =>{
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try{
            //await axios.post('/api/auth/login', inputs);
            await login(inputs)
            navigate("/");
        }catch(err) {
            setError(err.response.data)
        }
    }
    useEffect(() =>{
        window.scrollTo(0,0);
    }, []);
    return (
        <div className="login">
            <div>
                <GoBackButton />
            </div>
        <div className="loginContent">
            <h1>Connexion</h1>
            <form className="form">
                <input required type="text" placeholder="identifiant" name='username' onChange={handleChange} />
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
                <button onClick={handleSubmit}>Connexion</button>
                {err && <p>{err}</p>}
                <span>Seul l'administrateur peut se connecter.</span>
            </form>
        </div>
    </div>
    );
};

export default Login;