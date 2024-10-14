import { NavLink } from "react-router-dom"

const Username = () => {

if (!localStorage.getItem("auth-token")) return (
    <>
        <p>Not Logged In</p>
        <ul className='header-loginregister-buttons'>
            <li>
                <NavLink to='/login' className={({isActive}) =>
                  `${isActive ? "active" : "inactive" }`
                }>
                    Login here
                </NavLink>
            </li>
            <li>
                <NavLink to='/register' className={({isActive}) =>
                  `${isActive ? "active" : "inactive" }`
                }>
                    Register here
                </NavLink>
            </li>
        </ul>
    </>
  )
  return (
    <>
      <p>{localStorage.getItem('user-name')}</p>
    </> 
  )
}

export default Username
