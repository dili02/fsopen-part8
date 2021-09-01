const { query } = require('./query')
const { mutation } = require('./mutation')
const { book, user, author } = require('./types')

const typeDefs = [
    query,
    mutation,
    book,
    user,
    author
]

module.exports = {
    typeDefs
}