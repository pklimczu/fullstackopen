import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ADD_BOOK, ALL_BOOKS } from '../graphql/queries'

const NewBook = ({ favoriteGenre, show }) => {
  const [title, setTitle] = useState('Refresh')
  const [author, setAuhtor] = useState('Szymon Wydra')
  const [published, setPublished] = useState('2005')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState(['dupa'])

  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS, variables: { genre: favoriteGenre } }]
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    const publishedInt = parseInt(published)
    addBook({ variables: { title, author, published: publishedInt, genres }})

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>add a book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook