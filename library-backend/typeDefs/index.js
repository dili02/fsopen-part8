const { query } = require('./query')
const { mutation } = require('./mutation')
const { subscription } = require("././subscription")
const { book, user, author } = require('./types')

const typeDefs = [
    query,
    mutation,
    subscription,
    book,
    user,
    author
]

module.exports = {
    typeDefs
}