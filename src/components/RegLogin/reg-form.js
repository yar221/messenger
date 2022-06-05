import './forms.scss'
import { useContext, useState } from 'react';
import app from '../../firebase';
import db from '../../firebase';
import axios from 'axios';
import AppContext from '../../context/AppContext';

const RegForm = (props) => {

    const {userData,setUserData,authWindowOpenHandler,isAuthHandler} = useContext(AppContext)

    const registerHandler = async () => {
        isAuthHandler();
        
        // const auth = getAuth(app);

        // createUserWithEmailAndPassword(auth, userData.email, userData.password)

        // .then((userCredential) => {
        //     const user = userCredential.user;
        // })
        // .catch((error) => {
        //     console.error(`Error code: ${error.code}\r\nError messege: ${error.message}`)
        // });

        await axios.post(`https://messenger2-fcb59-default-rtdb.firebaseio.com/userData.json/`, userData)
            .catch((error) => {
                console.error(`Error code: ${error.code}\r\nError messege: ${error.message}`)
            });
        authWindowOpenHandler();
    }
    

    const {isRegHandler} = props

    return(
        <form action='#' className="reg-form form">
            <div className="form-email">
                <span className="form-reg_title">Email</span>
                <input type="text" className="form-reg_input" placeholder="Your Email" value={userData.email} onChange={event => {
                    
                    setUserData({
                        ...userData, 
                        email: event.target.value 
                    })
                    
                    }}/>
            </div>
            <div className="form-login">
                <span className="form-reg_title">Login</span>
                <input type="text" className="form-reg_input" placeholder="Your Login" value={userData.login} onChange={event => {
                    
                    setUserData({
                        ...userData, 
                        login: event.target.value 
                    })
                    
                    }}/>
            </div>
            <div className="form-password">
                <span className="form-reg_title">Password</span>
                <input type="text" className="form-reg_input" placeholder="Your Password" value={userData.password} onChange={event => {
                    
                    setUserData({
                        ...userData, 
                        password: event.target.value 
                    })
                    
                    }}/>
            </div>
            <button className="form-submit" type="submit" onClick={event => {
                    registerHandler()   
                    event.preventDefault()
                }}>Register</button>
            <div className="form-change" onClick={isRegHandler}>Do you want to login?</div>
        </form>
    )
}

export default RegForm