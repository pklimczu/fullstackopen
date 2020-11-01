import React from 'react';
import CountryInfo from './CountryInfo'

const Results = ({ countries, search }) => {

    if (search.length === 0) 
        return <div><br/>No input provided</div>

    const output = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))

    if (output.length > 10) {
        return <div><br/>Too much entries found!</div>
    }

    if (output.length === 0) {
        return <div><br/>Nothing were found</div>
    }

    return <div>
        <ul>
            {output.map(country => <CountryInfo key={country.name} info={country} /> )}
        </ul>
    </div>
}

export default Results