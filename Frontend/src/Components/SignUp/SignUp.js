import React, { useState} from "react"
import styles from "./SignUp.module.css"
import Axios from "axios"
import { useNavigate } from 'react-router-dom';

const SignUp = (props) =>{

    const [login, setLogin] = useState("");
    const [password, setpassword] = useState("");
    const [password2, setpassword2] = useState("");
    const [email, setemail] = useState("");
    const [isPasswordValid, SetIsPasswordValid] = useState(true);
    const [isEmailValid, SetIsEmailValid] = useState(true);
    const [isLoginValid, SetIsLoginValid] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post(`http://localhost:8080/register`, {login: login, password: password, email: email})
        .then( (response) =>{
            console.log(response.data)
            if(response.data.error){
                if(!response.data.isEmailValid){
                    SetIsEmailValid(false);
                }
                if(!response.data.isLoginValid){
                    SetIsLoginValid(false);
                }
            }
            else{
                navigate('/LogIn');
            }
        })
    }

    const handleBack = () => {
        navigate('/LogIn');
    }
    
    const checkPassword = () =>{
        if(password == password2 && password.length > 0){
            SetIsPasswordValid(true);
        }else{
            SetIsPasswordValid(false);
        }
    }

    const checkEmail = () =>{
        if(email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            SetIsEmailValid(true);
        }else{
            SetIsEmailValid(false);
        }
    }

    return(
        <div className={styles.mainContent}>
            <div className={styles.loginContainer}>
                <h3>Register</h3>
                <form className={styles.loginForm}>

                    <label>Login</label>
                    <input type="text" onChange={ (e) => {setLogin(e.target.value)}} onBlur={ (e) => {SetIsLoginValid(true)}}/>

                    <label>Email</label>
                    <input type="text" onChange={ (e) => {setemail(e.target.value)}} onBlur={ (e) => {checkEmail()}}/>

                    <label>Password</label>
                    <input type="password" onChange={ (e) => {setpassword(e.target.value)}} onBlur={ (e) => {checkPassword()}}/>

                    <label>Repeat password</label>
                    <input type="password" onChange={ (e) => {setpassword2(e.target.value)}} onBlur={ (e) => {checkPassword()}}/>

                    <div className={styles.buttons}>
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={handleBack}>Back</button>
                    </div>
                </form>

                <div>
                    <ul>
                       {!isEmailValid && <li>Email is not valid</li>} 
                       {!isPasswordValid && <li>Wrong password combination</li>}
                       {!isLoginValid && <li>Login already taken</li>}  
                    </ul>
                </div>   
            </div>  
        </div>
    ) 
  }

  export default SignUp;