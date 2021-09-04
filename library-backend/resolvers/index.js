const { query } = require('./query')
const { mutation } = require('./mutation')
const { author } = require('./author')
const { book } = require("./book")
const { subscription } = require("./subscription")

const resolvers = {
  Query: query,
  Mutation: mutation,
  Author: author,
  Book: book,
  Subscription: subscription
}

module.exports = {
  resolvers
};
