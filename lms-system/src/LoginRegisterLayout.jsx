
import { Outlet } from 'react-router-dom'
import './LoginRegisterLayout.css'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

const LoginRegisterLayout = () => {

  return (
    <>
      <Header />
      <div className='layout-loginregister'>
        <div className='layout-loginregister-content'>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  )
}


export default LoginRegisterLayout
