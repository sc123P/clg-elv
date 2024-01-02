import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext()
export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const login = async(inputs)=>{
        const res = await axios.post('/api/auth/login', inputs);
        setCurrentUser(res.data)
    };
    const logout = async(inputs)=>{
        await axios.post('/api/auth/logout', inputs);
        setCurrentUser(null)
    };

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser));
    },[currentUser]);

    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
          }
        }, []);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};