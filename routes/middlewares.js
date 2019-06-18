const jwt = require('jsonwebtoken')

//Check user token
function checkTokenSetUser(req, res, next) {
    const authHeader = req.get('authorization')
    if (authHeader) {
        //console.log(authHeader)
        const token = authHeader.split(' ')[1]
        //console.log(token)
        if (token) {
            jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
                if (error) {
                    console.log(error)
                }
                req.user = user
                next()
            })
        } else {
            next()
        }
    } else {
        next()
    }
}

//Is logged
function isLoggedIn(req, res, next) {
    if (req.user) {
        next()
    } else {
        const error = new Error('Unauthorized')
        res.status(401)
        next(error)
    }
}

//Is admin
function isAdmin(req, res, next) {
    if (req.user.role == 'admin') {
        next()
    } else {
        const error = new Error('Unauthorized')
        res.status(401)
        next(error)
    }
}

module.exports = {
    checkTokenSetUser,
    isLoggedIn,
    isAdmin
}
