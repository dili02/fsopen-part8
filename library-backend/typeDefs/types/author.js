const { gql } = require("apollo-server");

const author = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
`;

module.exports = {
  author,
};
