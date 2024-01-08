import React, { useState } from "react"
import styles from "./LogIn.module.css"
import Axios from "axios"
import { useNavigate } from 'react-router-dom';

const LogIn = () =>{

    const [login, setLogin] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('click');
        Axios.post(`http://localhost:8080/login`, {login: login, password: password})
        .then( (response) =>{
            console.log(response);
            localStorage.setItem('token', response.data.token);
            navigate('/');
        })
    }

    const handleRegister = () => {
        navigate('/register');
    }

    return(
    <div className={styles.mainContent}>
        <div className={styles.loginContainer}>
            <h3>Sign In</h3>
            <form className={styles.loginForm}>

                <label>Login</label>
                <input type="text" onChange={ (e) => {setLogin(e.target.value)}}/>

                <label>Password</label>
                <input type="password" onChange={ (e) => {setpassword(e.target.value)}}/>

                <div className={styles.buttons}>
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={handleRegister}>Register</button>
                </div>
            </form>
        </div>            
    </div>
    ) 
  }

  export default LogIn;