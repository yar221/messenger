import axios from "axios";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import {app} from '../../firebase';

import './forms.scss'

const LoginForm = (props) => {

    const {userData,setUserData,authWindowOpenHandler,isAuthHandler} = useContext(AppContext)
    
    const axiosRequestLoginHandler = () => {
        axios.get(`https://messenger2-fcb59-default-rtdb.firebaseio.com/userData.json`)
            .then(response => {
                let users = response.data
                let usersCellName = []
                let i = 0
                Object.keys(users).map(item => {
                    usersCellName[i] = item
                    ++i
                })
                
                for(let b = 0; b < usersCellName.length; b++){
                    if(users[usersCellName[b]].email === userData.email){
                        setUserData({
                            ...userData,
                            login: users[usersCellName[b]].login
                        })
                    }
                }
            })
            
    }

    const loginHandler = () => {
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, userData.email, userData.password)
        .then((userCredential) => {
            // const user = 
            console.log(userCredential.user);
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