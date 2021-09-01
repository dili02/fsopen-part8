import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from '../querys'
import EditAuthor from './EditAuthor'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null;
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors;
  if (!authors) return <p>No authors</p>

  return (
    <div>
      <EditAuthor authors={authors} setNotify={props.notify} />

      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
