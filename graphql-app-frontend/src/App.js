import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'
import Recommended from './components/Recommended'
import { ALL_BOOKS, BOOK_ADDED, ME } from './graphql/queries'


const App = () => {
  const [getUser, userData] = useLazyQuery(ME)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [favoriteGenre, setFavoriteGenre] = useState('')
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('app-token')
    if (token) {
      setToken(token)
      getUser()
      if (userData.data && userData.data.me) {
        setFavoriteGenre(userData.data.me.favoriteGenre)
      }
    }
  }, [getUser, userData.data])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.title).includes(object.title)

    const dataInStore = client.readQuery({ query: ALL_BOOKS, variables: { genre: '' } })

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        variables: { genre: '' },
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      updateCacheWith(subscriptionData.data.bookAdded)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    window.location.reload()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token != null && <button onClick={() => setPage('recommended')}>recommendations</button>}
        {token == null && <button onClick={() => setPage('login')}>login</button>}
        {token != null && <button onClick={() => setPage('add')}>add book</button>}
        {token != null && <button onClick={() => logout()}>logout</button>}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <Recommended favoriteGenre={favoriteGenre}
        show={page === 'recommended'}
      />

      <NewBook favoriteGenre={favoriteGenre}
        show={page === 'add'}
      />

      <Login setToken={setToken}
        show={page === 'login'}
      />
    </div>
  )
}

export default App