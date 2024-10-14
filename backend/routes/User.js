
const express = require('express')

const router = express.Router() // define router object

const controller = require("../controllers/UserController") // define controller object
const { validateToken } = require("../JWT")



// Define routes
router.post('/login', controller.Login)

router.get('/all_users', controller.GetAllUsers)

router.get('/single_user/:id', controller.GetSingleUser)

router.post('/add_user', controller.AddUser)

router.put('/update_user/:id', controller.UpdateUser)

router.delete('/delete_user/:id', controller.DeleteUser)

router.post('/email_user/:id', controller.SendUserEmail)


module.exports = router    // export router