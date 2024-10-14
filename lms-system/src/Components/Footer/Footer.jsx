import './Footer.css'
import footer_logo from '../../assets/lms_logo.png'
import instagram_icon from '../../assets/icons/instagram.svg'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="footer logo" />
      </div>
      <ul className='footer-links'>
        <li>Company</li>
        <li>Books</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icons">
        <div className="footer-icons-container">
            <img src={instagram_icon} alt="instagram icon" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
