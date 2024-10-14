
import {Outlet, useNavigate} from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import './Layout.css'
import RightPanel from './Components/RightPanel/RightPanel'
import { useEffect } from 'react'
import NavPanel from './Components/NavPanel/NavPanel'
// import UserContextProvider from './Context/UserContextProvider'

const Layout = () => {
    const navigate = useNavigate()  // used for navigation

    // check if user is logged in, if not redirect them to login page
    useEffect(() =>{
        if(!localStorage.getItem('auth-token')) {
            navigate('/login')  // navigate back to users page
        }
        else{
            navigate('/')  // navigate back to users page
        }
    }, [navigate])
  

  return (
    // <UserContextProvider>
    <>
        <div className='layout-all'>
            <Header />
            <div className='row layout-middle'>
                <div className='col-3 col-s-3'>
                    <NavPanel />
                </div>
                <div className="col-6 col-s-9">
                    <Outlet />
                </div>
                <div className='col-3 col-s-12'>
                    <RightPanel />
                </div>
            </div>
            <Footer />
        </div>
    </>
    // </UserContextProvider>
  )
}

export default Layout
