import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types'
import axios from "axios";
import { BookContext } from "./BookContext";

// create IssueContext with no default values because the provider implements the values
export const IssueContext = createContext();  // create the context

// Create the provider component that contains the actual state and functions
export const IssueProvider = ({ children }) => {

  const { updateAvailableAmount } = useContext(BookContext) // access the Book Context


    // define issues state
    const [issues, setIssues] = useState(null)
    const [singleIssue, setSingleIssue] = useState(null)
    const [userIssues, setUserIssues] = useState(null)
    const [fineCharge, setFineCharge] = useState(0.5)

    // function to add issue
    const addIssue = async (issue) => {
        // check if the book is available
        await axios.get(`http://localhost:5000/book/single_book/${issue.bookId}`)
        .then(async (res) => {  // if book is available then continue with completing issue
            console.log(res.data.available)
            if (res.data.available >= 1) {
                await axios.post(' http://localhost:5000/issue/add_issue', issue)
                .then((response) => {
                    // if book is successfully issued, then decrement the amount of this book that is available in the book table
                    updateAvailableAmount(issue.bookId, "minus")
                    // Ensure the response data contains the expected `id`
                    const responseData = response.data;
        
                    // Use the response data to update the state
                    if (responseData && responseData.id) {
                        setIssues((prev) => [...prev, { id: responseData.id, ...issue }]);
                    } else {
                        alert("Error: Invalid response from server");
                    }
                })
                .catch((err) => {
                    console.error(err);
                    alert("Failed to add issue");
                });
                
            }
            else{
                alert(`Book with ID: ${issue.bookId} is not available.`)
            }
        })
        .catch((err) => alert(err))

        
    }


    // function to get a single issue according to issueId
    const getSingleIssue = (id) => {
        axios.get(`http://localhost:5000/issue/single_issue/${id}`)
        .then((res) => {
            if (res.data) {
                setSingleIssue(res.data)
            }
        })
        .catch((err) => alert(err))
    }

    // function to get all user issues according to userId
    const getUserIssues = (id) => {
        axios.get(`http://localhost:5000/issue/user_issues/${id}`)
        .then((res) => {
            if (res.data) {
                setUserIssues(res.data)
            }
        })
        .catch((err) => alert(err))
    }

    // function to delete issue
    const updateIssue = async (id, updatedIssue, renew) => {
        // check if the book should be renewed
        if (renew){
            var date = new Date(updatedIssue.dueDate)
            date.setDate(date.getDate() + 5) // add five days to the due date
            updatedIssue.dueDate = date
        }
        if (updatedIssue.returned){
            updateAvailableAmount(updatedIssue.bookId, "plus")
        }

        
        // update the issue in the database
        await axios.put(`http://localhost:5000/issue/update_issue/${id}`, updatedIssue)
        .then(async ()=>{
            // if the book is successfully updated, then if book is being returned, increase book available amount 
            if (updatedIssue.returned){
                await updateAvailableAmount(updatedIssue.bookId, 1)
            }
            setIssues((prev) => prev.map((issue) => (issue.id === id ? updatedIssue : issue)))  // update issues state
        })
        .catch((err) => alert(err)) // catch and alert error

    }

    // function to delete issue
    const deleteIssue = async (id) => {
        // delete issue in database
        await axios.delete(`http://localhost:5000/issue/issue/delete_issue/${id}`, id)    // call api enpoint to delete issue passing the issue id
        .then(() => {
            setIssues((prev) => prev.filter((issue) => issue.id !== id)) // create a new array with all the entries that do not match this id (therefore removing the user with this id)
        }) // alert result
        .catch((err) => alert(err)) // catch and alert error
    }

    // Calculate fine amount
    const calculateFines = () => {
        // loop through each issue
        issues.forEach(issue => {
            // If book is overdue then calcualte fine
            if (Math.floor(
                (new Date().getTime() -
                    new Date(issue.dueDate).getTime()) /
                (1000 * 60 * 60 * 24) // divide by a day
                ) > 0) 
            {
                 // If overdue, calculate the new fine and format to 2 decimal places
                 issue.fineAmount = 
                    (
                        Math.floor(
                            (new Date().getTime() -
                                new Date(issue.dueDate).getTime()) /
                            (1000 * 60 * 60 * 24)
                        ) *
                        fineCharge  // fineCharge is the amount per day the fine will cost
                    ).toFixed(2)    // format to 
                // issue.fineAmount = toString(issue.fineAmount)
                updateIssue(issue.id, issue, false) // udpate the issue with the new fine amount
                
                // send an email with the fine details to the customer               
                axios.post(`http://localhost:5000/user/email_user/${issue.userID}`, issue)
            }
            // If book is due within the next 5 days then send a notification email
            else if (Math.floor(
                    (new Date().getTime() -
                        new Date(issue.dueDate).getTime()) /
                    (1000 * 60 * 60 * 24) // divide by a day
                    ) > -5) 
            {
                // send an email with the fine details to the customer               
                axios.post(`http://localhost:5000/user/email_user/${issue.userID}`, issue)
            }
        })
    }
    
    // function to toggleReturned in issues
    const toggleReturned = (id) => {
        setIssues((prev) =>
            prev.map((prevIssue) =>
                prevIssue.id === id ? { ...prevIssue, returned: !prevIssue.returned } : prevIssue  // toggle librarian property
            )
        )
    }

    

    // this effect runs once when the issued context is redered, it sets up a repeating call to the calcualte fin function useing the setInterval function. It also sends an email to the user with the fine amount.
    useEffect(() => {
        // set interval to run the following every day
        const intervalId = setInterval(() => {
            // check if there are any issues to iterate over
            if (issues) {
                calculateFines() // calcualte fines for each issue
                
            }
          }, 1000 * 60);  // will run every day
          // Cleanup the interval on component unmount or re-render
        return () => clearInterval(intervalId);
    }, []);  // Empty dependency array to run it only once after the initial render


    // as soon as this component mounts, this hook will be activated it will therefore only run once (to load the users in after that we just update the 'issues' state adnt he next effect is used to sync with the API)
    useEffect(() => {
        // Fetch users from API
        axios.get("http://localhost:5000/issue/all_issues")
        .then((res) => {
            if (res.data) {
                setIssues(res.data)
            }
        })
        .catch((err) => alert(err))
    }, [])

    // useEffect hook to get all user issues from database if use is logged in
    useEffect(() => {
        if (localStorage.getItem("user-id")){
            const id = localStorage.getItem("user-id")
            getUserIssues(id)  // get user details
        }
        
    }, [])  // run once

    return (
        <IssueContext.Provider value={{ issues, singleIssue, userIssues, fineCharge, getSingleIssue, getUserIssues, setFineCharge, addIssue, updateIssue, deleteIssue, calculateFines, toggleReturned }}>
            {children}
        </IssueContext.Provider>
    )
}

// Add PropTypes validation
IssueProvider.propTypes = {
    children: PropTypes.node.isRequired,  // Validate 'children' as required
};

