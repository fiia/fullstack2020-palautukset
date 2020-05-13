import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterForm = ({filterWord, handleFilterChange}) => {
  return (
    <div>
      <p>
        find countries
        <input
          value={filterWord}
          onChange={handleFilterChange}/>
      </p>
    </div>
  )
}

const MakeList = ({countries, filterWord, setFilterWord}) => {
  let cList = countries.filter(p => p['name'].toLowerCase()
                               .includes(filterWord.toLowerCase()))
  if(cList.length === 1) {
    return <CountrySpecs country={cList[0]} />
  }
  return (
    cList.length < 11 ?
      cList.map(c => ( <p key={c.name}>
                         {c.name} {c.number}
                         <button
                           onClick={() => setFilterWord(c.name)}>
                           show
                         </button>
                       </p>))
      : "Too many matches, specify another filter"
  )
}

const CountrySpecs = ({country}) => {
  return (
    <div>
      <h1>{country['name']}</h1>
      
      <p>capital {country['capital']}</p>
      <p>population {country['population']}</p>
      
      <h2>languages</h2>
      <ul>
        {country['languages'].map(a => ( <li key={a.name}>{a.name}</li>))}
      </ul>
      
      <img src={country['flag']} width="150" height="150" />

      <h2>Weather in {country['capital']}</h2>
    </div>
  )

}


const App = () => {

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  const [ countries, setCountries ] = useState([])
  const [ filterWord, setFilterWord ] = useState('')
  
  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setFilterWord(event.target.value)
  }


  return (
    <div>
      <FilterForm filterWord={filterWord} handleFilterChange={handleFilterChange} />
      <MakeList countries={countries} filterWord={filterWord}
                setFilterWord={setFilterWord} />
    </div>
  )
}

export default App
