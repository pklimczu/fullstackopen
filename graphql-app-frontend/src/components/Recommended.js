import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ME, SELECTED_BOOKS } from '../graphql/queries'

const Recommended = ({ show }) => {
    const [getUser, userData] = useLazyQuery(ME)
    const [getBooks, booksData] = useLazyQuery(SELECTED_BOOKS)
    const [genre, setGenre] = useState('')
    const [books, setBooks] = useState([])
    

    useEffect(() => {
        getUser()

        if (userData.data) {
            setGenre(userData.data.me.favoriteGenre)
            getBooks({ variables: { genre }})
            if (booksData.data) {
                setBooks(booksData.data.allBooks)
            }
        }
    }, [show, getUser, userData.data, getBooks, booksData.data, genre])

    if (!show) {
        return null
    }

    return (
        <div>
            <h2>recommendations for "{genre}" fan</h2>
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