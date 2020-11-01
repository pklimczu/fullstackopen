import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Finder from "./Finder"
import Results from "./Results"

const App = () => {

    const [search, setSearch] = useState("")
    const [countries, setCountries] = useState([])

    const countriesHook = () => {
        axios.get("https://restcountries.eu/rest/v2/all")
             .then((response) => {
                 setCountries(response.data)
             })
    }

    useEffect(countriesHook, [])

    return <div>
        <Finder search={search} setSearch={setSearch} />
        <Results countries={countries} search={search} />
    </div>
}

export default App;