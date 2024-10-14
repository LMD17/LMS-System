import { NavLink } from "react-router-dom"
import { RegisterForm } from "../Components"

const Register = () => {


  return (
        <>
          <h1>Register</h1>
          <RegisterForm />
          <p className='loginregister-nav-login'>Create an account? 
            <span>
              <NavLink to='/login' className={"loginregister-nav-link"}>
                Login here
              </NavLink>
            </span>
          </p>
        </>
  )
}

export default Register
