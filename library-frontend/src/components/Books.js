import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../querys'

const Books = ({ show }) => {
  const { data, loading } = useQuery(ALL_BOOKS)

  if (loading)  {
    return <div>loading...</div>
  }

  const books = data.allBooks;
  if (!books) return <p>No books</p>

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(book =>
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books
