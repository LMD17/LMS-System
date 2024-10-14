import { useContext, useState } from "react"
import { UserContext } from "../../Contexts/UserContext"
import { useNavigate } from "react-router-dom"


// component for login form
const LoginForm = () => {

  const navigate = useNavigate()
  const {loginUser} = useContext(UserContext)   // get addUser function from user context
  const [errorMsg, setErrorMsg] = useState("")  // define state

  // store form data
  const [formData, setFormData] = useState({
    email:"",
    password:"",
  })

  // change handler function to update fields
  const changeHandler = (e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  // funciton to handle login
  const login = async (e) => {
      e.preventDefault()   // dont submit anywhere
      setErrorMsg("") // reset error messages
      if (!(formData.email.trim() || formData.password.trim())) {
        return setErrorMsg("Error: All fields are required")
      }
      await loginUser(formData)
      if (localStorage.getItem("auth-token")) {
        navigate('/')  // navigate to home page if user successfully logged in
        // reset all fields
        setFormData({
          email: "",
          password: "",
        });
      }
  }
    

  return (
    <form className="form-container" onSubmit={login}>
      <p className="form-errormsg">{errorMsg}</p>
        <input 
        name="email"
        type="email" 
        value={formData.email}
        onChange={changeHandler}
        placeholder='Email'
        />
        <input 
        name="password"
        type="password" 
        value={formData.password}
        onChange={changeHandler}
        placeholder='Password'
        />
        
        <button type="submit">Login</button>
    </form>
    
  )
}

export default LoginForm
