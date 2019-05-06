const {generatePasswordHash} = require('../auth/hash')

const connection = require('./connection')

function createUser (user, testDb) {
  const db = testDb || connection

  return generatePasswordHash(user.hash)
    .then(hash => {
      return db('users').insert({username:user.username,hash})
    })
}

function userExists (username, testDb) {
  const db = testDb || connection

  return db('users')
    .where('username', username)
    .then(users => users.length > 0)
}

function getUserByUsername (username, testDb) {
  const db = testDb || connection

  return db('users')
    .where('username', username)
    .first()
}

function getAllUsers(testDb) {
  const db = testDb || connection
  return db('users')
}

module.exports = {
  createUser,
  userExists,
  getUserByUsername,
  getAllUsers
}