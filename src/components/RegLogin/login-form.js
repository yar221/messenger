import './forms.scss'

const LoginForm = (props) => {
    
    const {isRegHandler} = props

    return(
        <form action="#" className="login-form form">
            <div className="form-login">
                <span className="form-login_title">Login/Email</span>
                <input type="text" className="form-login_input" placeholder="Your Login/Email" />
            </div>
            <div className="form-password">
                <span className="form-login_title">Password</span>
                <input type="password" className="form-login_input" placeholder="Your Password" />
            </div>
            <button className="form-submit" type="submit">Login</button>
            <div className="form-change" onClick={isRegHandler}>Do you want to register?</div>
        </form>
    )
}

export default LoginForm