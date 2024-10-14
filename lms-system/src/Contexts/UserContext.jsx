import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types'
import axios from "axios"

// create UserContext with no default values because the provider implements the values
export const UserContext = createContext();  // create the context

// Create the provider component that contains the actual state and functions
export const UserProvider = ({ children }) => {

    // define states
    const [users, setUsers] = useState([])
    const [verifiedUser, setVerifiedUser] = useState([])
    
    // log user in
    const loginUser = async (user) => {
        // Login user with API
        await axios.post("http://localhost:5000/user/login", user)
        .then((res) => {
            if (res.data) {
                setVerifiedUser(res.data.user.dataValues)   // set the verified user
                // save certin user details in local storage
                localStorage.setItem('auth-token', res.data.token)  
                localStorage.setItem('user-id', res.data.user.dataValues.id)
                localStorage.setItem('user-name', res.data.user.dataValues.name)
                localStorage.setItem('librarian', res.data.user.dataValues.librarian)
            }
        })
        .catch((err) => {
            alert(err.response.data.error) // alert error
        })
    }

    // not sure if we need this becuase when user login in, verified user is there.
    const getSingleUser = async (id) => {
        // Fetch all users from API
        axios.get(`http://localhost:5000/user/single_user/${id}`)
        .then((res) => {
            if (res.data) {
                setVerifiedUser(res.data)
            }
        })
        .catch((err) => console.log(err))
    }
    
    // add user calling add_user api
    const addUser = async (user) => {
        // add user to database
        await axios.post(' http://localhost:5000/user/add_user', user)
        .then((response) => {
            // Ensure the response data contains the expected `id`
            const responseData = response.data;

            // Use the response data to update the state
            if (responseData && responseData.id) {
                setUsers((prev) => [...prev, { id: responseData.id, ...user }]);
                alert("User Created Successfully. Please proceed to login")
            } else {
                alert("Error: Invalid response from server");
            }
        })
        .catch((err) => {
            alert(err.response.data.error) // alert error
        })
    }

    // function to update user
    const updateUser = async (id, updatedUser) => {
        // update user in database
        await axios.put(`http://localhost:5000/user/update_user/${id}`, updatedUser)
        .then(() => {
            setUsers((prev) => prev.map((user) => (user.id === id ? updatedUser : user)))
        })
        .catch((err) => alert(err))
        
    }

    // function to delete user
    const deleteUser = async (id) => {
        // delete user in database
        await axios.delete(`http://localhost:5000/user/delete_user/${id}`, id)
        .then(() => {
            // if the account that is delete is the users account then clear local storage and reload website to log user out
            if(toString(localStorage.getItem('user-id'))===toString(id)){
                localStorage.clear()
                location.reload()
            }
            setUsers((prev) => prev.filter((user) => user.id !== id)) // create a new array with all the entries that do not match this id (therefore removing the user with this id)
        })
        .catch((err) => alert(err))
    }

    // function to toggleLibrarian in users
    const toggleLibrarian = (id) => {
        setUsers((prev) =>
            prev.map((prevUser) =>
                prevUser.id === id ? { ...prevUser, librarian: !prevUser.librarian } : prevUser  // toggle librarian property
            )
        )
    }

    // useEffect hook to get all users from database when UserContext is first loaded
    useEffect(() => {
        // Fetch all users from API
        axios.get("http://localhost:5000/user/all_users")
        .then((res) => {
            if (res.data) {
                setUsers(res.data)
            }
        })
        .catch((err) => console.log(err))
    }, [])  // run once

    // useEffect hook to get a user's details from database if the suer is logged in
    useEffect(() => {
        if (localStorage.getItem("user-id")){
            getSingleUser(localStorage.getItem("user-id"))  // get user details
        }
    }, [])  // run once

    return (
        <UserContext.Provider value={{ users, setUsers, verifiedUser, loginUser, getSingleUser, addUser, updateUser, deleteUser, toggleLibrarian }}>
            {children}
        </UserContext.Provider>
    )
}

// Add PropTypes validation
UserProvider.propTypes = {
    children: PropTypes.node.isRequired,  // Validate 'children' as required
};

