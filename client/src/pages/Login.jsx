import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [inputs, setInputs] = useState({
        username:"",
        password:"",
    });
    const [err, setError] = useState(null);
    //const navigate = useNavigate();
    //const navigate = useNavigate();

    const handleChange = e =>{
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try{
            await axios.post('/api/auth/login', inputs);
            //navigate("/connexion");
        }catch(err) {
            setError(err.response.data)
        }
    }
    return (
    <div className="login">
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