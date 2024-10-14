import { useContext, useState } from 'react'
import './IssuedBookItem.css'
import edit_icon from '../../assets/icons/edit-2.svg'
import save_icon from '../../assets/icons/save.svg'
import delete_icon from '../../assets/icons/trash-2.svg'
import renew_icon from '../../assets/icons/refresh-cw.svg'
import PropTypes from 'prop-types'
import { IssueContext } from '../../Contexts/IssuedContext'


const IssueItem = ({issue}) => {
  const { updateIssue, deleteIssue, toggleReturned} = useContext(IssueContext)  // get from context

  const [isIssueEditable, setIsIssueEditable] = useState(false) // define state

 // store form data
  const [formData, setFormData] = useState({
    id: issue.id,
    customerId: issue.customerId,
    bookId: issue.bookId,
    librarianId: issue.librarianId,
    dateLoaned: issue.dateLoaned,
    dueDate: issue.dueDate,
    fineAmount: issue.fineAmount,
    returned: issue.returned,
  })

  // function to edit and update issue
  const editIssue = () => {
    updateIssue(issue.id, {...issue, customerId: formData.customerId, bookId: formData.bookId, librarianId: formData.librarianId, dateLoaned: formData.dateLoaned, dueDate: formData.dueDate}, false)
    setIsIssueEditable(false)  // make editable false
  }

  // function to renew issue
  const renewIssue = () => {
      updateIssue(issue.id, {...issue, customerId: formData.customerId, bookId: formData.bookId, librarianId: formData.librarianId, dateLoaned: formData.dateLoaned, dueDate: formData.dueDate}, true)
      location.reload()
    }

  // function to toggle if an issued book has been returned
  const toggleReturnedFunc = () => {
    toggleReturned(issue.id)
  }

  // change handler function to update fields
  const changeHandler = (e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  return (
    <div className={ issue.returned ? 'issue-item-yes-returned' : 'issue-item-not-returned' }>
      <div className='returned-checkbox'>
        <label htmlFor="returned">Returned:</label>
        <input type="checkbox"
        name='retunred'
        checked={issue.returned}
        onChange={toggleReturnedFunc}
        disabled={!isIssueEditable}
        />
      </div>
      <table className='list-table'>
        <tbody>
          <tr>
            <td><label htmlFor="id">Issue ID:</label></td>
            <td>
              <input type="text"
                name='id'
                style={{ border: isIssueEditable ? '2px dashed darkorange' : '' }}
                value={formData.id}
                onChange={changeHandler}
                readOnly={true}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="customerId">Customer ID:</label></td>
            <td>
              <input type="text"
                name='customerId'
                style={{ border: isIssueEditable ? '2px dashed darkorange' : '' }}
                value={formData.customerId}
                onChange={changeHandler}
                readOnly={!isIssueEditable}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="bookId">Book ID:</label></td>
            <td>
              <input type="text"
                name='bookId'
                style={{ border: isIssueEditable ? '2px dashed darkorange' : '' }}
                value={formData.bookId}
                onChange={changeHandler}
                readOnly={!isIssueEditable}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="librarianId">Librarian ID:</label></td>
            <td>
              <input type="text"
                name='librarianId'
                style={{ border: isIssueEditable ? '2px dashed darkorange' : '' }}
                value={formData.librarianId}
                onChange={changeHandler}
                readOnly={!isIssueEditable}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="dateLoaned">Date Loaned:</label></td>
            <td>
              <input type='text'
                name='dateLoaned'
                style={{ border: isIssueEditable ? '2px dashed darkorange' : '' }}
                value={formData.dateLoaned}
                onChange={changeHandler}
                readOnly={!isIssueEditable}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="dueDate">Due Date:</label></td>
            <td>
              <input type='text'
                name='dueDate'
                style={{ border: isIssueEditable ? '2px dashed darkorange' : '' }}
                value={formData.dueDate}
                onChange={changeHandler}
                readOnly={!isIssueEditable}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="fineAmount">Fine Amount:</label></td>
            <td>
              <input type='number'
                name='fineAmount'
                value={formData.fineAmount}
                readOnly={true}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <button
      onClick={() => {
        renewIssue()
      }}
      >
      <img src={renew_icon} alt='Renew' style={{ width: '10px', height: '10px' }} />
      </button>

      <button
      onClick={() =>{
        if(localStorage.getItem("librarian")==="true"){
          if (isIssueEditable) {
            editIssue()
          }else setIsIssueEditable((prev) => !prev)
        }
      }}
      >
        <img 
        src={isIssueEditable ? save_icon : edit_icon} 
        alt={isIssueEditable ? "Save" : "Edit"} 
        style={{ width: '10px', height: '10px' }} 
        />
      </button>

      <button
      onClick={() => {
        if(localStorage.getItem("librarian")==="true"){
          deleteIssue(issue.id)
        }
      }}
      >
        <img src={delete_icon} alt='Delete' style={{ width: '10px', height: '10px' }} />
      </button>
    </div>
  )
}

// Add PropTypes validation
IssueItem.propTypes = {
  issue: PropTypes.shape({
    id: PropTypes.number.isRequired,
    customerId: PropTypes.number.isRequired,
    bookId: PropTypes.number.isRequired,
    librarianId: PropTypes.number.isRequired,
    dateLoaned: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    fineAmount: PropTypes.string.isRequired,
    returned: PropTypes.bool.isRequired,
  }).isRequired,
}


export default IssueItem
