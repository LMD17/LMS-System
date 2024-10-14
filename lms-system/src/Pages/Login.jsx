// import { useState, useContext } from 'react'
// import {UserContext} from '../Contexts/UserContext'
import './CSS/LoginRegister.css'
import { LoginForm } from "../Components"
import { NavLink } from 'react-router-dom'

const Login = () => {
    
  return (
    <>
      <h1>Login</h1>
      <LoginForm />
      <p className='loginregister-nav-login'>Already have an account? 
        <span>
          <NavLink to='/register' className={"loginregister-nav-link"}>
            Register here
          </NavLink>
        </span>
      </p>
    </>
  )
}

export default Login
