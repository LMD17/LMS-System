
// const Book = require("../models/Book")
const { Issued } = require("../models"); // Assuming `models/index.js` exports Book



module.exports = {
    // get all issues
    GetAllIssues: (req, res) => {
        Issued.findAll()
            .then((issues) => {
                res.send(issues) // sent all issues back to client
            })
            .catch((err) => {
                console.log(err)    // return error and error message
            })
    },
    // get single issue according to id
    GetSingleIssue: (req, res) => {
        const issueId = req.params.id
        if (issueId) {
            Issued.findAOne({ where: { id: issueId } })
                .then((issue) => {
                    console.log("Sending issue with spcific id: ", { issueId })
                    res.send(issue)  // send issue back to client
                })
                .catch((err) => {
                    console.log(err)    // return error and error message
                })
        }
    },
    // get all user issues according to userId
    GetUserIssues: (req, res) => {
        const userId = req.params.userId
        if (userId) {
            Issued.findAll({ where: { customerId: userId } })
                .then((issues) => {
                    console.log("Sending all issues with specific user id: ", { userId })
                    res.send(issues)  // send issue back to client
                })
                .catch((err) => {
                    console.log(err)    // return error and error message
                })
        }
    },
    // Register issue
    AddIssue: (req, res) => {
        const { customerId, librarianId, bookId, dateLoaned, dueDate, fineAmount } = req.body  // get data from client request
        Issued.create({
            customerId: customerId,
            librarianId: librarianId,
            bookId: bookId,
            dateLoaned: dateLoaned,
            dueDate: dueDate,
            fineAmount: fineAmount,
            returned: false,   //auto set returned as false (issue cannot be returned when it is first created)
        })
            .then((result) => {
                const id = result.dataValues.id  // get the auto generated id of the created issue
                res.json({ message: "Issue added successfully", id: id });   // pass success message and id back to client
            })
            .catch((err) => {
                if (err === "SequelizeUniqueConstraintError") {
                    res.status(500).json({ error: "Email already exists" }) // return email exists error
                }
                else {
                    res.status(500).json({ error: err })   // return error and error message
                }
            })
    },
    // update a single issue according to id
    UpdateIssue: (req, res) => {
        const id = req.params.id  // get id from url
        const updatedIssue = req.body  // get data from client request
        // console.log("Id and issue: " + id + " " + updatedIssue)
        Issued.update(updatedIssue, { where: { id: id } })
            .then(() => {
                res.json({ message: "Issue UPDATE success ID:", id: id });
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    },
    // delete a single issue according to id
    DeleteIssue: (req, res) => {
        const id = req.params.id  // get id from url
        Issued.destroy({ where: { id: id } })
            .then(() => {
                res.json({ message: "Issue DELETE success ID: ", id: id });
            })
            .catch((err) => {
                console.log(err)    // return error and error message
            })
    }
}