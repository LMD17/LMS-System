import { useContext, useState } from 'react'
import './bookItem.css'
import edit_icon from '../../assets/icons/edit-2.svg'
import save_icon from '../../assets/icons/save.svg'
import delete_icon from '../../assets/icons/trash-2.svg'
import PropTypes from 'prop-types'
import { BookContext } from '../../Contexts/BookContext'


const BookItem = ({book}) => {
  const { updateBook, deleteBook} = useContext(BookContext)

  const [isBookEditable, setIsBookEditable] = useState(false)

 // store form data
  const [formData, setFormData] = useState({
    id: book.id,
    title: book.title,
    author: book.author,
    category: book.category,
    isbn: book.isbn,
    genre: book.genre,
    publicationDate: book.publicationDate,
    quantity: book.quantity,
    available: book.available,
  })

  // fnunction to edit and update book
  const editBook = () => {
    updateBook(book.id, {...book, title: formData.title, author: formData.author, category: formData.category, isbn: formData.isbn, genre: formData.genre, publicationDate: formData.publicationDate, quantity: Number(book.quantity), available: Number(formData.available)})
    setIsBookEditable(false)  // make editable false
  }

  // change handler function to update fields
  const changeHandler = (e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }
 

  return (
    <div className={ book.available == 0 ?  'book-item-not-available' : 'book-item-yes-available'} >
      <table className='list-table'>
        <tbody>
          <tr>
            <td><label htmlFor="id">Book ID:</label></td>
            <td>
              <input type="text"
                name='id'
                style={{ border: isBookEditable ? '2px dashed darkorange' : '' }}
                value={formData.id}
                onChange={changeHandler}
                readOnly={true}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="title">Title:</label></td>
            <td>
              <input type="text"
                name='title'
                style={{ border: isBookEditable ? '2px dashed darkorange' : '' }}
                value={formData.title}
                onChange={changeHandler}
                readOnly={!isBookEditable}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="author">Author:</label></td>
            <td>
              <input type="text"
                name='author'
                style={{ border: isBookEditable ? '2px dashed darkorange' : '' }}
                value={formData.author}
                onChange={changeHandler}
                readOnly={!isBookEditable}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="category">Category:</label></td>
            <td>
              <input type="text"
                name='category'
                style={{ border: isBookEditable ? '2px dashed darkorange' : '' }}
                value={formData.category}
                onChange={changeHandler}
                readOnly={!isBookEditable}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="isbn">ISBN:</label></td>
            <td>
              <input type="text"
                name='isbn'
                style={{ border: isBookEditable ? '2px dashed darkorange' : '' }}
                value={formData.isbn}
                onChange={changeHandler}
                readOnly={!isBookEditable}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="genre">Genre:</label></td>
            <td>
              <input type='text'
                name='genre'
                style={{ border: isBookEditable ? '2px dashed darkorange' : '' }}
                value={formData.genre}
                onChange={changeHandler}
                readOnly={!isBookEditable}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="publicationDate">Publication:</label></td>
            <td>
              <input type='text'
                name='publicationDate'
                style={{ border: isBookEditable ? '2px dashed darkorange' : '' }}
                value={formData.publicationDate}
                onChange={changeHandler}
                readOnly={!isBookEditable}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="quantity">Quantity:</label></td>
            <td>
              <input type='number'
                name='quantity'
                style={{ border: isBookEditable ? '2px dashed darkorange' : '' }}
                value={formData.quantity}
                onChange={changeHandler}
                readOnly={!isBookEditable}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="available">Available:</label></td>
            <td>
              <input type='number'
                name='available'
                style={{ border: isBookEditable ? '2px dashed darkorange' : '' }}
                value={formData.available}
                onChange={changeHandler}
                readOnly={!isBookEditable}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <button
      onClick={() =>{
        if(localStorage.getItem("librarian")==="true"){
          if (isBookEditable) {
            editBook()
          }else setIsBookEditable((prev) => !prev)
        }
      }}
      >
        <img 
        src={isBookEditable ? save_icon : edit_icon} 
        alt={isBookEditable ? "Save" : "Edit"} 
        style={{ width: '10px', height: '10px' }} // You can adjust size as needed
        />
      </button>

      <button
      onClick={() => {
        if(localStorage.getItem("librarian")==="true"){
          deleteBook(book.id)
        }
      }}
      >
        <img src={delete_icon} alt='Delete' style={{ width: '10px', height: '10px' }} />
      </button>
    </div>
  )
}

// Add PropTypes validation
BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    isbn: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    publicationDate: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    available: PropTypes.number.isRequired
  }).isRequired,
}


export default BookItem
