import { useContext, useState } from "react"
import { UserContext } from "../Contexts/UserContext"
import { useNavigate } from "react-router-dom"
// import add_icon from "../assets/icons/plus-circle.svg"

const AddUser = () => {
      
    const {addUser} = useContext(UserContext)
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate()

    // store form data
    const [formData, setFormData] = useState({
      name:"",
      email:"",
      password:"",
      address:"",
      phone:"",
      librarian: false
    })


    // change handler function to update fields
    const changeHandler = (e)=>{
      setFormData({...formData, [e.target.name]:e.target.value})
    }

    // function to add user
    const add = (e) => {
        e.preventDefault()   // dont submit anywhere

        // check if all fields have values
        if (!(formData.name.trim() || formData.email.trim() || formData.password.trim() || formData.address.trim() || formData.phone.trim())) {
          setErrorMsg("Error: \nAll fields are required")
        }
        else{
          formData.librarian = Boolean(formData.librarian)  // auto set librarian to false becuase only customers can create accounts and they are not librarians
          addUser(formData)   // add user
          alert("User Created Successfully")
          // reset all fields
          setFormData({
          name: "",
          email: "",
          password: "",
          address: "",
          phone: "",
          librarian: false
          });
          navigate('/users')  // navigate back to users page
        }
    }
    
  return (
    <>
        <h1>Add User</h1>
        <p className="form-errormsg">{errorMsg}</p>
        <form className="form-container" >
          <p>Librarian:</p>
          <input type="checkbox"
          name="librarian"
          checked={formData.librarian}
          onChange={changeHandler}
          />
          <input 
          name="name"
          type="text" 
          onChange={changeHandler}
          placeholder='Username'
          />
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
          <button onClick={add}>Add</button>
          {/* <button type="submit">Add</button> */}
        </form>
    </>
    
  )
}

export default AddUser
