import React, { useState } from 'react';

const CountryInfo = ({ info }) => {
    const [contentHidden, setContentHidden] = useState(true)

    const onClicked = () => {
        setContentHidden(!contentHidden)
    }

    return <li><img style={{width: 20}} src={info.flag} alt="flag" /> {info.name} <button onClick={onClicked}>{contentHidden ? "show" : "hide"}</button>
        <br/>
        <div style={{display: contentHidden ? "none" : "inline"}}>
            capital: {info.capital} <br/>
            population: {info.population} <br/>
            spoken languages: {info.languages.map(language => language.name).join(", ")} <br/>
        </div>
    </li>
}

export default CountryInfo