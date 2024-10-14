import { useContext, useState } from "react"
import IssueItem from "../Components/IssuedBooksItems/IssuedBookItem"
import { IssueContext } from "../Contexts/IssuedContext"
import './CSS/ListPages.css'

// get user issued books
const UserIssuedBooks = () => {
  const { userIssues, fineCharge } = useContext(IssueContext)   // get values from Issue Context
  const [searchQuery, setSearchQuery] = useState("")

  var search_parameters = null

  if(userIssues!=null){
    search_parameters = Object.keys(Object.assign({}, ...userIssues))  // specify search parameters
  }

  // function for searching users
  function search(data) {
    //  Using the Array.filter() and Array.some() methods to check if any of the search query parameters include the value of our query includes(searchQuery).
    return data.filter((issuesData) =>
      search_parameters.some((param) =>
        issuesData[param].toString().toLowerCase().includes(searchQuery)
      )
    )
  }
    

  return (
    <div>
      <div className="user-buttons">
        <div>
        <div className="fineRate">
          <label htmlFor="fineRate">Current Fine Rate For Late Returns: R</label>
          <input type="number" 
          id="fineRate"
          name="fineRate"
          value={fineCharge}
          readOnly={true}
          />
          <div>
            <p>per day</p>
            <p>per book</p>
          </div>
        </div>
        </div>
      </div>
      <div className="search-form">
        <h3>Search Issues</h3>
        <input
          type="search"
          id="search-form"
          name="search-form"
          className="search-input"
          onChange={(e) => setSearchQuery(e.target.value.toLocaleLowerCase())}  // when a user types in the searchb bar, we start searching the users array
          placeholder="Search issue..."
        />
      </div>
      
      <div className="item-row">
        {userIssues ? (
          search(userIssues).map((dataObj) => {
            return (
              <div key={dataObj.id}>
                {dataObj.id ? (
                  <div key={dataObj.id} className="item-column-4 item-column-s-6">
                    <IssueItem issue={dataObj} />
                  </div>
                ): null}
              </div>
            );
          })
        ) : (<div><h1>You have not loaned any books yet</h1><br></br><h1>We hope to see you loaning a book soon!</h1></div>)
        }
      </div>
    </div>
  )
}

export default UserIssuedBooks
