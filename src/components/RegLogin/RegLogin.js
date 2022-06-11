import { useContext, useState } from 'react'
import LoginForm from './login-form'
import './RegLogin.scss'
import close from "../../img/krest.png"
import RegForm from './reg-form'
import AppContext from '../../context/AppContext'

const RegLogin = () => {

    const [isReg, setIsReg] = useState(false)
    const [validationOfLinesRegLogin, setValidationOfLinesRegLogin] = useState({
        email: {
          errorMessage: 'Enter the correct Email',
          valid: false,
          validation: {
            struct: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          }
        },
        password: { 
          errorMessage: 'Enter the correct password',
          valid: false,
          validation: {
            minLength: 4
          }
        },
        login: {
          errorMessage: 'Enter the correct login',
          valid: false,
          validation: {
            minLength: 4
          }
        }, 
      })

    const { authWindowOpenHandler, setUserData, userData } = useContext(AppContext)

    const isRegHandler = () => {
        setIsReg(!isReg)
        setUserData({
            ...userData,
            login: ''
        })
    }

    const emailHandler = (value) => {
        if (validationOfLinesRegLogin.email.validation.struct.test(String(value).toLowerCase())){
            validationOfLinesRegLogin.email.valid = true
        }else{
            validationOfLinesRegLogin.email.valid = false
        }
      }
    
      const passwordHandler = (value) => {
        if(validationOfLinesRegLogin.password.validation.minLength < value.length){
            validationOfLinesRegLogin.password.valid = true
        }else{
            validationOfLinesRegLogin.password.valid = false
        }
      }
    
      const loginHandler = (value) => {
        if(validationOfLinesRegLogin.login.validation.minLength < value.length){
            validationOfLinesRegLogin.login.valid = true
        }else{
          validationOfLinesRegLogin.login.valid = false
        }
      }

    return(
        <div className="reglogin-window">
            <div className="reglogin-body">
                <img src={close} alt="close-window" className='close-button' onClick={authWindowOpenHandler}/>
                <span className="reglogin-line"></span>
                {isReg ? <LoginForm passwordHandler = {passwordHandler} loginValidHandler= {loginHandler} validationOfLinesRegLogin = {validationOfLinesRegLogin} isRegHandler = {isRegHandler} /> : <RegForm emailHandler ={emailHandler} passwordHandler = {passwordHandler} loginHandler= {loginHandler} validationOfLinesRegLogin = {validationOfLinesRegLogin} isRegHandler = {isRegHandler}/>}
            </div>
        </div>
    )
}

export default RegLogin