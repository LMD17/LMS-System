
const express = require('express')

const router = express.Router() // define router object

const controller = require("../controllers/BookController") // define controller object

// Define routes
router.get('/all_books', controller.GetAllBooks)    // get all books

router.get('/single_book/:id', controller.GetSingleBook)    //get a single book based on book id

router.post('/add_book', controller.AddBook)    // add a book

router.put('/update_book/:id', controller.UpdateBook)   // update a book

router.put('/update_book_available/:id', controller.UpdateBookAvailable)   // update a book available quantity

router.delete('/delete_book/:id', controller.DeleteBook)    // delete a book



module.exports = router    // export router