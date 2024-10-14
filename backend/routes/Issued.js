
const express = require('express')

const router = express.Router() // define router object

const controller = require("../controllers/IssuedController") // define controller object


// Define routes
router.get('/all_issues', controller.GetAllIssues)  // get all issues

router.get('/single_issue/:id', controller.GetSingleIssue)  // get a specific issue based on issue id

router.get('/user_issues/:userId', controller.GetUserIssues)    // get all issues from a specific user based on user id

router.post('/add_issue', controller.AddIssue)  // add new issue

router.put('/update_issue/:id', controller.UpdateIssue) // update an issue

router.delete('/delete_issue/:id', controller.DeleteIssue)  // delete an issue


module.exports = router    // export router