const { query } = require('./query')
const { mutation } = require('./mutation')
const { author } = require('./author')

const resolvers = {
  Query: query,
  Mutation: mutation,
  Author: author
}

module.exports = {
  resolvers
};
