import './forms.scss'

const RegForm = (props) => {

    const {isRegHandler} = props

    return(
        <form action="#" className="reg-form form">
            <div className="form-email">
                <span className="form-reg_title">Email</span>
                <input type="text" className="form-reg_input" placeholder="Your Email" />
            </div>
            <div className="form-login">
                <span className="form-reg_title">Login</span>
                <input type="text" className="form-reg_input" placeholder="Your Login" />
            </div>
            <div className="form-password">
                <span className="form-reg_title">Password</span>
                <input type="text" className="form-reg_input" placeholder="Your Password" />
            </div>
            <button className="form-submit" type="submit">Register</button>
            <div className="form-change" onClick={isRegHandler}>Do you want to login?</div>
        </form>
    )
}

export default RegForm