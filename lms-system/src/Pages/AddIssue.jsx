import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IssueContext } from "../Contexts/IssuedContext"
import "./CSS/Add.css"
// import add_icon from "../assets/icons/plus-circle.svg"

const AddIssue = () => {
      
    const {addIssue} = useContext(IssueContext)
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate()



    // store form data
    const [formData, setFormData] = useState({
      customerId: "",
        bookId: "",
        librarianId: "",
        dateLoaned: "", 
        dueDate: "",  
        fineAmount: 0,  // fine amount should automatically be 0 becuase this is calculated automatically
    })


    // change handler function to update fields
    const changeHandler = (e)=>{
      setFormData({...formData, [e.target.name]:e.target.value})
    }

    // function to add issue
    const add = (e) => {
        e.preventDefault()   // dont submit anywhere

        // check if all fields have values
        if (!(formData.customerId.trim() && formData.bookId.trim() && formData.librarianId.trim() && formData.dateLoaned.trim() && formData.dueDate.trim())) {
          setErrorMsg("Error: \nAll fields are required")
        }
        else{
          alert(formData.dueDate)
          addIssue(formData)   // add issue 
          // if an error is returned
          alert("Issue Created Successfully")
          // reset all fields
          setFormData({
            customerId: "",
            bookId: "",
            librarianId: "",
            dateLoaned: "",
            dueDate: "",
            fineAmount: 0,  // fine amount should automatically be 0 becuase this is calculated automatically
            returned: false,  // default to false. book cannot be returned  when it is first issued
          });
          navigate('/issuedbooks')  // navigate back to users page
        }
    }
    
  return (
    <>
        <h1>Add Issue</h1>
        <p className="form-errormsg">{errorMsg}</p>
        <form className="form-container" >
            <table className="form-table">
              <tbody>
              <tr>
                <td>
                  <label htmlFor="customerId">Customer Id</label>
                </td>
                <td>
                  <input 
                  id="customerId"
                  name="customerId"
                  type="text" 
                  value={formData.customerId}
                  onChange={changeHandler}
                  placeholder='Customer ID'
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="bookId">Book Id</label>
                </td>
                <td>
                  <input 
                    id="bookId"
                    name="bookId"
                    type="text" 
                    value={formData.bookId}
                    onChange={changeHandler}
                    placeholder='Book ID'
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="librarianId">Librarian Id</label>
                </td>
                <td>
                  <input 
                    id="librarianId"
                    name="librarianId"
                    type="text" 
                    value={formData.librarianId}
                    onChange={changeHandler}
                    placeholder='Librarian ID'
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="dateLoaned">Date Loaned</label>
                </td>
                <td>
                  <input 
                    id="dateLoaned"
                    name="dateLoaned"
                    type="date" 
                    value={formData.dateLoaned}
                    onChange={changeHandler}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="dueDate">Due Date</label>
                </td>
                <td>
                  <input 
                    id="dueDate"
                    name="dueDate"
                    type="date" 
                    value={formData.dueDate}
                    onChange={changeHandler}
                  />
                </td>
              </tr>
              </tbody>

            </table>
            <button onClick={add}>Add</button>
        </form>
    </>
  )
}

export default AddIssue
