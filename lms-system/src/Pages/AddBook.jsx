import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BookContext } from "../Contexts/BookContext"


const AddBook = () => {
      
    const {addBook} = useContext(BookContext)
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate()

    // store form data
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        author: "",
        category: "",
        isbn: "",
        genre: "",
        publicationDate: "",
        quantity: "",
        available: "",
    })


    // change handler function to update fields
    const changeHandler = (e)=>{
      setFormData({...formData, [e.target.name]:e.target.value})
    }

    // function to add book
    const add = (e) => {
        e.preventDefault()   // dont submit anywhere

        // check if all fields have values
        if (!(formData.title.trim() || formData.author.trim() || formData.category.trim() || formData.isbn.trim() || formData.genre.trim() || formData.publicationDate.trim() || formData.quantity.trim() || formData.available.trim())) {
          setErrorMsg("Error: \nAll fields are required")
        }
        else{
          formData.available = formData.quantity // available should be the same as quantity when adding a new book
          addBook(formData)   // add book 
          // if an error is returned
          alert("Book Created Successfully")
          // reset all fields
          setFormData({
              title: "",
              author: "",
              category: "",
              isbn: "",
              genre: "",
              publicationDate: "",
              quantity: "",
              available: "",
          });
          navigate('/books')  // navigate back to users page
        }
    }
    
  return (
    <>
        <h1>Add Book</h1>
        <p className="form-errormsg">{errorMsg}</p>
        <form className="form-container" >
            <input type="text"
            name="title"
            checked={formData.title}
            onChange={changeHandler}
            placeholder='Title'
            />
            <input 
            name="author"
            type="text" 
            value={formData.author}
            onChange={changeHandler}
            placeholder='Author'
            />
            <input 
            name="category"
            type="text" 
            value={formData.category}
            onChange={changeHandler}
            placeholder='Category'
            />
            <input 
            name="isbn"
            type="text" 
            value={formData.isbn}
            onChange={changeHandler}
            placeholder='ISBN'
            />
            <input 
            name="genre"
            type="text" 
            value={formData.genre}
            onChange={changeHandler}
            placeholder='Genre'
            />
            <div className="publicationDate">
              <label htmlFor="publicationDate">Publication Date:</label>
              <input 
              id="publicationDate"
              name="publicationDate"
              type="date" 
              value={formData.publicationDate}
              onChange={changeHandler}
              placeholder='Publication Date'
              />
            </div>
            <input 
            name="quantity"
            type="number" 
            value={formData.quantity}
            onChange={changeHandler}
            placeholder='Total Quantity'
            />
            <input 
            name="available"
            type="number" 
            value={formData.available}
            onChange={changeHandler}
            placeholder='Available'
            />
            <button onClick={add}>Add</button>
        </form>
    </>
  )
}

export default AddBook
