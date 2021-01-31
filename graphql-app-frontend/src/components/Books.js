import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS } from '../graphql/queries'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const books = useQuery(ALL_BOOKS)

  if (books.loading || books.data === undefined) {
    return <div>loading...</div>
  }

  console.log("BOOKS", books)

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
          {books.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books