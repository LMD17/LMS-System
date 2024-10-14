import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types'
import axios from "axios";

// create BookContext with no default values because the provider implements the values
export const BookContext = createContext();  // create the context

// Create the provider component that contains the actual state and functions
export const BookProvider = ({ children }) => {
    // define book state
    const [singleBook, setSingleBook] = useState(null)
    const [books, setBooks] = useState(null)

    // function to get a single book according to bookId
    const getSingleBook = (id) => {
        axios.get(`http://localhost:5000/book/single_book/${id}`)
        .then((res) => {
            if (res.data) {
                setSingleBook(res.data)
            }
        })
        .catch((err) => alert(err))
    }

    // function to add book
    const addBook = (book) => {
        axios.post(' http://localhost:5000/book/add_book', book)
        .then((response) => {
            // Ensure the response data contains the expected `id`
            const responseData = response.data;

            // Use the response data to update the state
            if (responseData && responseData.id) {
                setBooks((prev) => [...prev, { id: responseData.id, ...book }]);
                alert("Book added" + book)
            } else {
                alert("Error: Invalid response from server");
            }
        })
        .catch((err) => {
            console.error(err);
            alert("Failed to add book");
        });
    }

    // function to delete book
    const updateBook = (id, updatedBook) => {
        axios.put(`http://localhost:5000/book/update_book/${id}`, updatedBook)
        .then(() => {
            setBooks((prev) => prev.map((book) => (book.id === id ? updatedBook : book)))   // update books state
        })
        .catch((err) => alert(err)) // catch and alert error

    }

    

    // function to decrement the number of a certain book that is available. (function is called when a book is issued)
    const updateAvailableAmount = (id, bookAction) => { // bookAction will either be 1 or -1 depending on whether the book is issued or returned
        if(bookAction === "plus"){
            alert("PLUS")
            setBooks((prev) =>
                prev.map((prevBook) =>
                    prevBook.id === id ? { ...prevBook, available: parseInt(prevBook.available) + 1 } : { prevBook } // reduce available property by 1
                )
            )
        }else{ // bookAction === "minus"
            setBooks((prev) =>
                prev.map((prevBook) =>
                    prevBook.id === id ? { ...prevBook, available: parseInt(prevBook.available) - 1 } : { prevBook } // reduce available property by 1
                )
            )
        }
        axios.put(`http://localhost:5000/book/update_book_available/${id}`, bookAction)   // call the update_book api endpoint
        .then(()=>{
            // update the books state array with new available quantity
            setBooks((prev) =>
                prev.map((prevBook) =>
                    prevBook.id === id ? { ...prevBook, available: prevBook.available + bookAction } : { prevBook } // reduce available property by 1
                )
            )
        })
        .catch((err) => alert(err)) // catch and alert error
    }

    // function to delete book
    const deleteBook = async (id) => {
        // delete book in database
        await axios.delete(`http://localhost:5000/book/delete_book/${id}`, id)  // call api enpoint to delete book passing the book id
        .then(() => {
            setBooks((prev) => prev.filter((book) => book.id !== id)) // create a new array with all the entries that do not match this id (therefore removing the user with this id)
        }) // alert result
        .catch((err) => alert(err)) // catch and alert error
    }

    

    // as soon as this component mounts, this hook will be activated it will therefore only run once (to load the users in after that we just update the 'books' state adnt he next effect is used to sync with the API)
    useEffect(() => {
        // Fetch users from API
        axios.get("http://localhost:5000/book/all_books")
        .then((res) => {
            if (res.data) {
                setBooks(res.data)
            }
        })
        .catch((err) => alert(err))
    }, [])


    return (
        <BookContext.Provider value={{ books, singleBook, getSingleBook, addBook, updateBook, updateAvailableAmount, deleteBook }}>
            {children}
        </BookContext.Provider>
    )
}


// Add PropTypes validation
BookProvider.propTypes = {
    children: PropTypes.node.isRequired,  // Validate 'children' as required
};

