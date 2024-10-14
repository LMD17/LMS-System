import { useContext, useState } from "react"
import { UserContext } from "../../Contexts/UserContext"


// component for register form
const RegisterForm = () => {

    const {addUser} = useContext(UserContext) // get addUser function from user context
    const [errorMsg, setErrorMsg] = useState("")  // define state

    // store form data
    const [formData, setFormData] = useState({
      name:"",
      email:"",
      password:"",
      address:"",
      phone:""
    })


    // change handler function to update fields
    const changeHandler = (e)=>{
      setFormData({...formData, [e.target.name]:e.target.value})
    }

    // funciton to handle login
    const add = (e) => {
      e.preventDefault()   // dont submit anywhere
      setErrorMsg("") // reset error messages
      if (!(formData.name || formData.email || formData.password || formData.address || formData.phone)) {
        return setErrorMsg("Error: All fields are required")
      }
      addUser(formData) // call addUser function from user context
      // reset all fields
      setFormData({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: ""
      });
    }
    
  return (
    <form className="form-container" onSubmit={add}>
      <p className="form-errormsg">{errorMsg}</p>
      <input 
      name="name"
      type="text" 
      value={formData.name}
      onChange={changeHandler}
      placeholder='Username'
      />
      {" "}
      <input 
      name="email"
      type="email" 
      value={formData.email}
      onChange={changeHandler}
      placeholder='Email'
      />
      {" "}
      <input 
      name="password"
      type="password" 
      value={formData.password}
      onChange={changeHandler}
      placeholder='Password'
      />
      <input 
      name="address"
      type="text" 
      value={formData.address}
      onChange={changeHandler}
      placeholder='Address'
      />
      <input 
      name="phone"
      type="text" 
      value={formData.phone}
      onChange={changeHandler}
      placeholder='Phone'
      />
      <button type="submit">Register</button>
    </form>
    
  )
}

export default RegisterForm
