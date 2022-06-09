import { useContext, useState } from 'react'
import LoginForm from './login-form'
import './RegLogin.scss'
import close from "../../img/krest.png"
import RegForm from './reg-form'
import AppContext from '../../context/AppContext'

const RegLogin = () => {

    const [isReg, setIsReg] = useState(false)

    const { authWindowOpenHandler, setUserData, userData } = useContext(AppContext)

    const isRegHandler = () => {
        setIsReg(!isReg)
        setUserData({
            ...userData,
            login: ''
        })
    }

    return(
        <div className="reglogin-window">
            <div className="reglogin-body">
                <img src={close} alt="close-window" className='close-button' onClick={authWindowOpenHandler}/>
                <span className="reglogin-line"></span>
                {isReg ? <LoginForm isRegHandler = {isRegHandler} /> : <RegForm isRegHandler = {isRegHandler}/>}
            </div>
        </div>
    )
}

export default RegLogin