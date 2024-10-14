import { useContext, useState } from "react"
import { UserItem } from "../Components"
import { UserContext } from "../Contexts/UserContext"
import { Link } from "react-router-dom"
import './CSS/ListPages.css'

// Users page
const Users = () => {
  const { users } = useContext(UserContext) // get users from User Context
  const [searchQuery, setSearchQuery] = useState("")

  var search_parameters = null

  if(users!=null){
    search_parameters = Object.keys(Object.assign({}, ...users))  // specify search parameters
  }

  // function for searching users
  function search(data) {
    //  Using the Array.filter() and Array.some() methods to check if any of the search query parameters include the value of our query includes(searchQuery).
    return data.filter((usersData) =>
      search_parameters.some((param) =>
        usersData[param].toString().toLowerCase().includes(searchQuery)
      )
    )
  }

  
  return (

    <div className="container">
      <div className="user-buttons">
         <Link to="/adduser" className="link">ADD USER</Link>
      </div>
      <div className="search-form">
        <h3>Search Users</h3>
        <input
          type="search"
          id="search-form"
          name="search-form"
          className="search-input"
          onChange={(e) => setSearchQuery(e.target.value.toLocaleLowerCase())}  // when a user types in the searchb bar, we start searching the users array
          placeholder="Search user..."
        />
      </div>

      <div className="item-row">
        {users ? (
          search(users).map((dataObj) => {
            return (
              <div key={dataObj.id}>
                {dataObj.id ? (
                  <div key={dataObj.id} className="item-column-4 item-column-s-6">
                    <UserItem user={dataObj} />
                  </div>
                ): null}
              </div>
            );
          })
        ) : (<h1>No Users</h1>)
        }
      </div>
    </div>

  );

  // return (
  //   <div>
  //     <div className="user-buttons">
  //       <Link to="/adduser" className="link">ADD USER</Link>
  //       <input
  //         type="search"
  //         id="search-form"
  //         name="search-form"
  //         className="search-input"
  //         onChange={(e) => setSearchQuery(e.target.value)}
  //         placeholder="Search user"
  //       />
  //     </div>
  //     <div className="item-row">
  //       {users ? (
  //         users.map((user) => (
  //           user.id ? (
  //             <div key={user.id} className="item-column-4 item-column-s-6">
  //               <UserItem user={user} />
  //             </div>
  //           ): null
  //         )
  //         )
  //       ) : (<h1>No Users</h1>)
  //       }
  //     </div>
  //   </div>
  // )
}

export default Users
