import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import {app} from '../../firebase';

import './forms.scss'

const LoginForm = (props) => {

    const { userData,setUserData,authWindowOpenHandler,isAuthHandler,axiosRequestLoginHandler } = useContext(AppContext)   

    const {validationOfLinesRegLogin, passwordHandler, loginValidHandler} = props
    
    const loginHandler = () => {
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, userData.email, userData.password)
        .then(() => {
            axiosRequestLoginHandler()
            authWindowOpenHandler()
            isAuthHandler()
        })
        .catch((error) => {
            console.log(error.code);
        });

    }

    const resetValidation = () => {
        validationOfLinesRegLogin.password.valid = false
        validationOfLinesRegLogin.login.valid = false
    }

    useEffect(() => {
        passwordHandler(userData.password)
        loginValidHandler(userData.login)
    },[userData])
    
    const {isRegHandler} = props

    return(
        <form action="#" className="login-form form">
            <div className="form-login">
                <span className="form-login_title">Email</span>
                <input type="text" className="form-login_input" placeholder="Your Login/Email" value={userData.email} onChange={event => {
                    
                    setUserData({
                        ...userData, 
                        email: event.target.value 
                    })
                    
                    }}/>
                    {!validationOfLinesRegLogin.login.valid ? <span className="form-errorMessage">{validationOfLinesRegLogin.login.errorMessage}</span> : null}  
            </div>
            <div className="form-password">
                <span className="form-login_title">Password</span>
                <input type="password" className="form-login_input" placeholder="Your Password" value={userData.password} onChange={event => {
                    
                    setUserData({
                        ...userData, 
                        password: event.target.value 
                    })
                    
                    }}/>
                    {!validationOfLinesRegLogin.password.valid ? <span className="form-errorMessage">{validationOfLinesRegLogin.password.errorMessage}</span> : null}  
            </div>
            <button className="form-submit" type="submit" onClick={event => {
                    loginHandler()   
                    event.preventDefault()
                }}>Login</button>
            <div className="form-change" onClick={() => {
                    isRegHandler()
                    resetValidation()
                }}>Do you want to register?</div>
        </form>
    )
}

export default LoginForm