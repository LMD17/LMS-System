import { useContext, useState } from 'react'
import './UserItem.css'
import edit_icon from '../../assets/icons/edit-2.svg'
import save_icon from '../../assets/icons/save.svg'
import delete_icon from '../../assets/icons/trash-2.svg'
import PropTypes from 'prop-types'
import { UserContext } from '../../Contexts/UserContext'


const UserItem = ({user}) => {
  const {updateUser, deleteUser, toggleLibrarian} = useContext(UserContext) // get from context
  const [isUserEditable, setIsUserEditable] = useState(false) // define state

 // store form data
  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    address: user.address,
    phone: user.phone,
    librarian: user.librarian
  })

  // function to edit and update user
  const editUser = () => {
    updateUser(user.id, {...user, name: formData.name, email: formData.email, password: formData.password, address: formData.address, phone: formData.phone})
    setIsUserEditable(false)  // make editable false
  }

  // function to toggle if librarian has been changed (someone was not a librarian and now is, and visa versa)
  const toggleLibrarianed = () => {
    toggleLibrarian(user.id)
  }

  // change handler function to update fields
  const changeHandler = (e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  return (
    <div className={ user.librarian ? 'user-item-librarian' : 'user-item-consumer' } >
      <div className='librarian-checkbox'>
        <label htmlFor="librarian">Librarian:</label>
        <input type="checkbox"
        name='librarian'
        checked={user.librarian}
        onChange={toggleLibrarianed}
        disabled={!isUserEditable}
        />
      </div>
      <table className='list-table'>
        <tbody>
        <tr>
          <td><label htmlFor="id">User ID:</label></td>
          <td>
            <input type="text"
              name='id'
              style={{ border: isUserEditable ? '2px dashed darkorange' : '' }}
              value={formData.id}
              onChange={changeHandler}
              readOnly={true}
            />
          </td>
        </tr>
        <tr>
          <td><label htmlFor="name">Name:</label></td>
          <td>
            <input type="text"
              name='name'
              style={{ border: isUserEditable ? '2px dashed darkorange' : '' }}
              value={formData.name}
              onChange={changeHandler}
              readOnly={!isUserEditable}
            />
          </td>
        </tr>
        <tr>
          <td><label htmlFor="email">Email:</label></td>
          <td>
            <input type="email"
              name='email'
              style={{ border: isUserEditable ? '2px dashed darkorange' : '' }}
              value={formData.email}
              onChange={changeHandler}
              readOnly={!isUserEditable}
            />
          </td>
        </tr>
        <tr>
          <td><label htmlFor="password">Password:</label></td>
          <td>
            <input type="password"
              name='password'
              style={{ border: isUserEditable ? '2px dashed darkorange' : '' }}
              value={formData.password}
              onChange={changeHandler}
              readOnly={!isUserEditable}
            />
          </td>
        </tr>
        <tr>
          <td><label htmlFor="address">Address:</label></td>
          <td>
            <input type="text"
              name='address'
              style={{ border: isUserEditable ? '2px dashed darkorange' : '' }}
              value={formData.address}
              onChange={changeHandler}
              readOnly={!isUserEditable}
            />
          </td>
        </tr>
        <tr>
          <td><label htmlFor="phone">Phone:</label></td>
          <td>
            <input type='text'
              name='phone'
              style={{ border: isUserEditable ? '2px dashed darkorange' : '' }}
              value={formData.phone}
              onChange={changeHandler}
              readOnly={!isUserEditable}
            />
          </td>
        </tr>
        </tbody>
      </table>

      <button
      onClick={() =>{
        if (isUserEditable) {
          editUser()
        }else setIsUserEditable((prev) => !prev)
      }}
      >
      <img 
      src={isUserEditable ? save_icon : edit_icon} 
      alt={isUserEditable ? "Save" : "Edit"} 
      style={{ width: '10px', height: '10px' }} // You can adjust size as needed
      />
      </button>

      <button
      onClick={() => {
        alert("In Delete")
        
        deleteUser(user.id)
      }}
      >
        <img src={delete_icon} alt='Delete' style={{ width: '10px', height: '10px' }} /></button>
    </div>
  )
}

// Add PropTypes validation
UserItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    address: PropTypes.string,
    phone: PropTypes.string,
    librarian: PropTypes.bool.isRequired,
  }).isRequired,
}


export default UserItem
