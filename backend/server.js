const express = require("express")
const cors = require("cors")
const path = require("path")
const cookieParser = require("cookie-parser")


const app = express()   // create instance of the express application

app.use(express.static(path.join(__dirname, "public")))   // set up middleware functions to serve static files
app.use(cors()) //addres security concers by implements Cross Origin Resource Sharing (cors) to manage and control web security
app.use(express.json())    // pass json data from incoming http requests to process data sent from the client
app.use(cookieParser())

const PORT = 5000   // port where the server will listen for incoming requests

const db = require('./models')

const userRoute = require('./routes/User')
const bookRoute = require('./routes/Book')
const issuedRoute = require('./routes/Issued')


app.use('/user', userRoute)
app.use('/book', bookRoute)
app.use('/issue', issuedRoute)




// Sync database and start the server
db.sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error syncing the database:", err);
    });