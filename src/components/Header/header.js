import './header.css'
import authImg from '../../img/user-in.png'
import noAuthImg from '../../img/user-out.png'
import { useContext } from 'react'
import AppContext from '../../context/AppContext'

const Header = () => {
    const {state} = useContext(AppContext)

    return(
        <header className='header'>
            <div className="header_container _container">
                <div className="header_body">
                    <h1 className="header-logo">Messenger</h1>
                    <div className="header-auth">
                        {!state.isAuth && <span className='header-auth_text'>You aren't in your account</span>}
                        {state.isAuth && <span className='header-auth_text'>Login</span>}
                        <img src={!state.isAuth ? noAuthImg : authImg} alt={noAuthImg} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header