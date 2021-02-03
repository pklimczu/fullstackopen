import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS, GET_ALL_GENRES } from '../graphql/queries'

const Books = (props) => {

  const [getBooks, booksData] = useLazyQuery(ALL_BOOKS)
  const [getAllGenres, genresData] = useLazyQuery(GET_ALL_GENRES)
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    getAllGenres()

    if (genresData.data) {
      const newGenres = new Set()
      genresData.data.allBooks.map(book => 
        book.genres.map(genre => 
          genre.length > 0 && newGenres.add(genre)))
      var arr = Array.from(newGenres)
      setGenres(arr)
    }
  }, [genresData.data, getAllGenres])

  useEffect(() => {
    getBooks({ variables: { genre: filter } })
    if (booksData.data) {
      setBooks(booksData.data.allBooks)
    }
  }, [getBooks, booksData.data, filter])

  const filterGenre = (event) => {
    setFilter(event.target.value)
  }

  if (!props.show) {
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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h4>genres</h4>
        {genres.map(genre => <button key={genre} value={genre} onClick={filterGenre}>{genre}</button>)}
        <button value="" onClick={filterGenre}>all</button>
      </div>
    </div>
  )
}

export default Books