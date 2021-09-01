const { gql } = require("apollo-server");

const query = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
`;

module.exports = {
  query,
};
