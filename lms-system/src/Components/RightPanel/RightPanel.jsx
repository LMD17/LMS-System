import './RightPanel.css'
import logo from "../../assets/lms_logo.png"

const RightPanel = () => {

  // const [type, setType] = useState(null)
  return (
    <div className="rightpanel-whole">
      <div className="rightpanel">
        <h1>WE LOVE BOOKS</h1>
        <div className='head-logo'>
          <img src={logo} alt="LMS Logo" />
        </div>
        {/* {type===null ? (
          <h1>WE LOVE BOOKS</h1>
        ) : (type==="users" ? (
          <>
            <h1>Add User</h1>
            <RegisterForm />
          </>
        )
        ) } */}
        <h1>AND YOU DO TOO</h1>
      </div>
    </div>
  )
}

export default RightPanel
