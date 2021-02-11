const router = require('express').Router()

const db = require('../db/users')
const token = require('../auth/token')

router.post('/register', register, token.issue)

function register (req, res, next) {
  const user = req.body
    db.userExists(user.username)
      .then(exists => {
        if(exists) return res.status(400).send({message: "User Name Taken"})
        db.createUser(user)
        .then( next())
        .catch(err => res.status(500).send({message: err.message}))
      })
}

router.post('/login', token.issue)

module.exports = router