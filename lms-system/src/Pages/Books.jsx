import { Link } from "react-router-dom"
import BookItem from "../Components/BookItem/BookItem"
import { BookContext } from "../Contexts/BookContext"
import { useContext, useState } from "react"
import './CSS/ListPages.css'

const Books = () => {

  const { books } = useContext(BookContext)
  const [searchQuery, setSearchQuery] = useState("")

  var search_parameters = null

  if(books!=null){
    search_parameters = Object.keys(Object.assign({}, ...books))  // specify search parameters
  }

  // function for searching books
  function search(data) {
    //  Using the Array.filter() and Array.some() methods to check if any of the search query parameters include the value of our query includes(searchQuery).
    return data.filter((booksData) =>
      search_parameters.some((param) =>
        booksData[param].toString().toLowerCase().includes(searchQuery)
      )
    )
  }

  return (
    <div>
      {localStorage.getItem("librarian") ? (<div className="user-buttons">
          <Link to="/addbook" className="link">ADD BOOK</Link>
        </div>) : (<></>)}
      <div className="search-form">
        <h3>Search Books</h3>
        <input
          type="search"
          id="search-form"
          name="search-form"
          className="search-input"
          onChange={(e) => setSearchQuery(e.target.value.toLocaleLowerCase())}  // when a user types in the searchb bar, we start searching the users array
          placeholder="Search book..."
        />
      </div>

      <div className="item-row">
        {books ? (
          search(books).map((dataObj) => {
            return (
              <div key={dataObj.id}>
                {dataObj.id ? (
                  <div key={dataObj.id} className="item-column-4 item-column-s-6">
                    <BookItem book={dataObj} />
                  </div>
                ): null}
              </div>
            );
          })
        ) : (<h1>No Users</h1>)
        }
      </div>
    </div>
  )
}

export default Books
