import { useContext, useState } from "react"
import IssueItem from "../Components/IssuedBooksItems/IssuedBookItem"
import { IssueContext } from "../Contexts/IssuedContext"
import { Link } from "react-router-dom"
import './CSS/ListPages.css'


const IssuedBooks = () => {
  const { issues, fineCharge, setFineCharge, calculateFines } = useContext(IssueContext)
  const [searchQuery, setSearchQuery] = useState("")

  var search_parameters = null

  if(issues!=null){
    search_parameters = Object.keys(Object.assign({}, ...issues))  // specify search parameters
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
          <Link to="/addissue" className="link">NEW ISSUE</Link>
        </div>
        <div>
          <Link className="link" onClick={calculateFines}>CALCULATE FINES</Link>
        </div>
        <div className="fineRate">
          <label htmlFor="fineRate">Fine Rate: R</label>
          <input type="number" 
          id="fineRate"
          name="fineRate"
          value={fineCharge}
          step={0.1}
          onChange={(e) => setFineCharge(e.target.value)} />
          <div>
            <p>per day</p>
            <p>per book</p>
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
        {issues ? (
          search(issues).map((dataObj) => {
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
        ) : (<h1>No Issues</h1>)
        }
      </div>
    </div>
  )
}

export default IssuedBooks
