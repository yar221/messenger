import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import {app} from '../../firebase';

import './forms.scss'

const LoginForm = (props) => {

    const { userData,setUserData,authWindowOpenHandler,isAuthHandler,axiosRequestLoginHandler } = useContext(AppContext)   
    
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
            </div>
            <div className="form-password">
                <span className="form-login_title">Password</span>
                <input type="password" className="form-login_input" placeholder="Your Password" value={userData.password} onChange={event => {
                    
                    setUserData({
                        ...userData, 
                        password: event.target.value 
                    })
                    
                    }}/>
            </div>
            <button className="form-submit" type="submit" onClick={event => {
                    loginHandler()   
                    event.preventDefault()
                }}>Login</button>
            <div className="form-change" onClick={isRegHandler}>Do you want to register?</div>
        </form>
    )
}

export default LoginForm