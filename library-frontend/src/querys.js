import { gql } from "@apollo/client";

// @Authors
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      id
    }
  }
`;

// @Books
export const ALL_BOOKS = gql`
  query fetchBooks($filterByAuthor: String, $filterByGenre: String) {
    allBooks(author: $filterByAuthor, genre: $filterByGenre) {
      title
      author {
        name
        born
        bookCount
        id
      }
      genres
      published
      id
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
        id
      }
    }
  }
`;

export const FIND_BOOKS_WITH_GENRE = gql`
  query getallBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      genres
      author {
        name
      }
    }
  }
`;

// @Auth
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;
