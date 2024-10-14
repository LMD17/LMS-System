
const { sign, verify } = require("jsonwebtoken")

const createTokens = (user) => {
    const accessToken = sign({ id: user.id, name: user.name, librarian: user.librarian },
        "supersecretsecret"
    )

    return accessToken
}


// validate if user has logged in and has a valid token
const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"]

    // check if user has logged in and has a token
    if (!accessToken) return res.status(500).json({ error: "User not authenticated" })
    // if (!accessToken) return

    try {
        const validToken = verify(accessToken, "supersecretsecret")   // check if token is valid
        // check if token is valid
        if (validToken) {
            req.authenticated = true // if user is authenticated then pass a return a variable 'authenticated' with the value true
            return next()
        }
    } catch (err) {
        res.status(500).json({ error: err })    // return error
    }
}


module.exports = { createTokens, validateToken }

