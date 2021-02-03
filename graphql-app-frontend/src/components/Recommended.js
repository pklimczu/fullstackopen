import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../graphql/queries'

const Recommended = ({ favoriteGenre, show }) => {
    const [getBooks, booksData] = useLazyQuery(ALL_BOOKS)
    const [books, setBooks] = useState([])
    
    useEffect(() => {
        if (favoriteGenre) {
            getBooks({ variables: { genre: favoriteGenre }})
            if (booksData.data) {
                setBooks(booksData.data.allBooks)
            }
        }
    }, [show, getBooks, booksData.data, favoriteGenre])

    if (!show) {
        return null
    }

    return (
        <div>
            <h2>recommendations for "{favoriteGenre}" fan</h2>
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
        </div>
    )
}

export default Recommended