
// const User = require("../models/User")
const { User } = require("../models"); // Assuming `models/index.js` exports User
const bcrypt = require('bcrypt')
const { createTokens } = require("../JWT")
const nodemailer = require('nodemailer');



module.exports = {
    // get all users
    GetAllUsers: (req, res) => {
        User.findAll()
            .then((users) => {
                res.send(users) // sent all users back to client
            })
            .catch((err) => {
                console.log(err)    // return error and error message
            })
    },
    // get single user according to their id
    GetSingleUser: (req, res) => {
        const userId = req.params.id
        User.findOne({ where: { id: userId } })
            .then((user) => {
                console.log("Sending user with spcific id: ", { userId })
                res.send(user)  // send user back to client
            })
            .catch((err) => {
                console.log(err)    // return error and error message
            })
    },
    // Register user
    AddUser: (req, res) => {
        const { name, email, password, address, phone, librarian } = req.body  // get data from client request
        bcrypt.hash(password, 10).then((hash) => {
            User.create({
                name: name,
                email: email,
                password: hash,
                address: address,
                phone: phone,
                librarian: false,   //auto set librian as false (only an existing librarian can change this from the users page)
            })
                .then((result) => {
                    const id = result.dataValues.id  // get the auto generated id of the created user
                    res.json({ message: "User added successfully", id: id });   // pass success message and id back to client
                })
                .catch((err) => {
                    if (err === "SequelizeUniqueConstraintError") {
                        res.status(500).json({ error: "Email already exists" }) // return email exists error
                    }
                    else {
                        res.status(500).json({ error: err })   // return error and error message
                    }
                })
        })
    },
    // login user
    Login: async (req, res) => {
        const { email, password } = req.body  // get data from client request
        const user = await User.findOne({ where: { email: email } })   // check if email exists

        if (!(user)) return res.status(500).json({ error: "User Does Not Exist" })

        // check if password in db for specific email matches input email
        const dbPassword = user.password    // get password for the input email form the database
        bcrypt.compare(password, dbPassword).then((match) => {
            if (!match) {
                res.status(500).json({ error: "Wrong email and password combination" })
            }
            else {
                const accessToken = createTokens(user)  // create access token for user

                // create cookie in browser
                res.cookie("access-token",
                    accessToken,
                    {
                        maxAge: 1000 * 60 * 60 * 24 * 30,
                        httpOnly: true,
                    }  // set cookie expiration to 30 days (in milliseconds)
                )

                // Create a new object, omitting 'password' because we dont want to pass the password information back and forth
                const { password, address, ...newObject } = user;
                const userDetails = newObject
                res.json({ message: "User Logged In Successfully", user: userDetails, token: accessToken })
            }
        })
    },
    // update a single user according to their id
    UpdateUser: (req, res) => {
        const id = req.params.id  // get id from url
        const updatedUser = req.body  // get data from client request
        User.update(updatedUser, { where: { id: id } })
            .then(() => {
                res.json({ message: "User UPDATE success ID:", id: id });
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    },
    // delete a single user according to their id
    DeleteUser: (req, res) => {
        const id = req.params.id  // get id from url
        User.destroy({ where: { id: id } })
            .then(() => {
                res.json({ message: "User DELETE success ID: ", id: id });
            })
            .catch((err) => {
                console.log(err)    // return error and error message
            })
    },
    // Send email notification to user
    SendUserEmail: async (req, res) => {
        const { userId, bookId, dueDate, fineAmount } = req.body  // get id from url

        const user = await User.findOne({ where: { id: userId } })
        if (!user) {
            return res.status(500).json({ error: "User does not exist" })
        }
        var { email, name } = user  // get email and name
        email = toString(email) //  make sure email is a string


        // create transprt using nodemailer
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'inspired.roar@gmail.com',
                pass: 'dnru lfws hdry klpa'
            }
        });

        // define mail options
        var mailOptions = {
            from: 'inspired.roar@gmail.com',
            to: email,
            subject: 'User Notification',
            html: `
            <h1>Good day ${name}</h1><br>
            <p>The following Book requires your attention:</p>
            <p>Book ID: ${bookId}</p>
            <p>Due Date: ${dueDate}</p><br>
            <p>Please note that you will be fined for each day that your book is handed in late.</p>
            <p>Current Fine Amount: ${fineAmount}</p><br>
            <p>Kind regards</p>
            <p>LMS Management</p>
            `
        };
        // send the email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).json({ error: "An error occurred", details: error });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: 'Email sent successfully', response: info.response });
            }
        })

    }
}