import { NavLink } from 'react-router-dom'
import './NavPanel.css'

const NavPanel = () => {

  
  // if user is librarian
  if (localStorage.getItem('librarian') === "true"){
    return (
      <div className='navpanel-whole'>

        <nav className='navpanel'>
          <li>
            <NavLink to='/' className={({isActive}) =>
              `${isActive ? "active" : "inactive" }`
            }>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/books' className={({isActive}) =>
              `${isActive ? "active" : "inactive" }`
            }>
              Books
            </NavLink>
          </li>
          <li>
            <NavLink to='/issuedbooks' className={({isActive}) =>
              `${isActive ? "active" : "inactive" }`
            }>
              Issued
            </NavLink>
          </li>
          <li>
            <NavLink to='/users' className={({isActive}) =>
              `${isActive ? "active" : "inactive" }`
            }
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink 
            to='/login' // navigate back to login
            className={({isActive}) =>
              `${isActive ? "active" : "inactive" }`
            } 
            onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}
            >
              LOGOUT
            </NavLink>
          </li>
        </nav>
      </div>
    )
  }
  else{
    // else normal user
    return (
      <div className='navpanel-whole'>

        <nav className='navpanel'>
          <li>
            <NavLink to='/' className={({isActive}) =>
              `${isActive ? "active" : "inactive" }`
            }>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/books' className={({isActive}) =>
              `${isActive ? "active" : "inactive" }`
            }>
              Books
            </NavLink>
          </li>
          <li>
            <NavLink to='/userissued' className={({isActive}) =>
              `${isActive ? "active" : "inactive" }`
            }>
              Loaned
            </NavLink>
          </li>
          <li>
            <NavLink to='/profile' className={({isActive}) =>
              `${isActive ? "active" : "inactive" }`
            }>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to='/login' className={({isActive}) =>
              `${isActive ? "active" : "inactive" }`
            }
            onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}
            >
              LOGOUT
            </NavLink>
          </li>
        </nav>
        
      </div>
    )
  }
}

 

export default NavPanel
