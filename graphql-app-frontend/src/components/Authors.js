  
import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../graphql/queries'

const Authors = (props) => {

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor, resultEditAuthor ] = useMutation(EDIT_AUTHOR)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (resultEditAuthor.data && resultEditAuthor.data.editAuthor === null) {
      console.log("Oops, something went wrong")
    }
  }, [resultEditAuthor.data])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, born: parseInt(born) }})

    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h4>Edit author</h4>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.data.allAuthors.map(author => <option value={author.name} key={author.name}>{author.name}</option>)}
          </select>
        </div>
        <div>
          born
          <input value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type='submit'>edit author</button>
      </form>
    </div>
  )
}

export default Authors
