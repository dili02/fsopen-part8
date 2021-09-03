import React from "react";
import { useQuery } from "@apollo/client";
import { ME, ALL_BOOKS } from "../querys";

const Recommended = ({ show }) => {
  const { loading: userLoading, data: user } = useQuery(ME);

  const favoriteBookGenre = user?.me?.favoriteGenre;
  const { loading: bookLoading, data: book } = useQuery(ALL_BOOKS, {
    variables: { filterByGenre: favoriteBookGenre },
  });

  if (userLoading || bookLoading) return <p>loading ...</p>;

  if (!show) {
    return null;
  }
  return (
    <div>
      <h2>recomendations</h2>

      <p>
        books in your favorite genre <b>{favoriteBookGenre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>

          {book.allBooks?.length === 0 && !bookLoading && (
            <tr>
              <td colSpan="3">No books found in your favorite genre :(</td>
            </tr>
          )}

          {book?.allBooks?.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
