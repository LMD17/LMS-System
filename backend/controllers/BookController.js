
// const Book = require("../models/Book")
const { Book } = require("../models"); // Assuming `models/index.js` exports Book

module.exports = {
    // get all books
    GetAllBooks: (req, res) => {
        Book.findAll()
            .then((books) => {
                res.send(books) // sent all books back to client
            })
            .catch((err) => {
                console.log(err)    // return error and error message
            })
    },
    // get single book according to id
    GetSingleBook: (req, res) => {
        const bookId = req.params.id
        Book.findOne({ where: { id: bookId } })
            .then((book) => {
                console.log("Sending book with spcific id: ", { bookId })
                res.send(book)  // send book back to client
            })
            .catch((err) => {
                console.log(err)    // return error and error message
            })
    },
    // Register book
    AddBook: (req, res) => {
        const { title, author, category, isbn, genre, publicationDate, quantity, available } = req.body  // get data from client request
        Book.create({
            title: title,
            author: author,
            category: category,
            isbn: isbn,
            genre: genre,
            publicationDate: publicationDate,
            quantity: quantity,
            available: available,
        })
            .then((result) => {
                const id = result.dataValues.id  // get the auto generated id of the created book
                res.json({ message: "Book added successfully", id: id });   // pass success message and id back to client
            })
            .catch((err) => {
                res.status(500).json({ error: err })   // return error and error message
            })
    },
    // update a single book according to id
    UpdateBook: (req, res) => {
        const id = req.params.id  // get id from url
        const updatedBook = req.body  // get data from client request
        // console.log("Id and issue: " + id + " " + updatedAvailable)
        Book.update(updatedBook, { where: { id: id } })
            .then(() => {
                res.json({ message: "Book UPDATE success ID:", id: id });
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    },
    // update a single book available quantity according to id
    UpdateBookAvailable: (req, res) => {
        const id = req.params.id  // get id from url
        const bookAction = req.body  // get data from client request (bookAction will either be 1 or -1 depending on whether the book is issued or returned)
        var action = 0
        console.log("Available:", available, "Action:", action); // Debugging
        console.log(typeof available === 'number' && typeof action === 'number')
        if (bookAction === "plus") {
            action = 1
        } else {
            action = -1
        }
        Book.update({ available: available + action }, { where: { id: id } })
            .then(() => {
                res.json({ message: "Book available UPDATE success ID:", id: id });
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    },
    // delete a single book according to id
    DeleteBook: (req, res) => {
        const id = req.params.id  // get id from url
        Book.destroy({ where: { id: id } })
            .then(() => {
                res.json({ message: "Book DELETE success ID: ", id: id });
            })
            .catch((err) => {
                console.log(err)    // return error and error message
            })
    }
}