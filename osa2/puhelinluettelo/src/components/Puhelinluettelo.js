import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Numbers from '../services/Numbers'

const FilterForm = ({filterWord, handleFilterChange}) => {
  return (
    <div>
      <p>
        filter shown with:
        <input
          value={filterWord}
          onChange={handleFilterChange}/>
      </p>
    </div>
  )

}

const MakeList = ({persons, setPersons, filterWord, setMessage}) => {
  let l = persons.filter(p => p['name'].toLowerCase()
                         .includes(filterWord.toLowerCase()))

  function handleDelete(name) {
    if(window.confirm(`Delete ${name}?`)) {
      let person = persons.find(p => p.name===name)
      Numbers.deleteOne(person)
      setMessage(`Deleted ${name}`)
      setTimeout(() => {
        setMessage('')
      }, 5000)
      setPersons(persons.filter(p => p.name!==name))
    }
  }
  
  return (
    l.map(p => (<li key={p.name}>
		<p>
                  {p.name} {p.number} 
                <button onClick={() => handleDelete(p.name)}>delete</button>
                </p>
                </li>))
  )
}

const PersonForm = ({addName, handleNameChange, newName,
		     newNumber, handleNumberChange}) => {
  return (
  <form onSubmit={addName}>
    <div>      
      <p>
        name:
        <input
          value={newName}
          onChange={handleNameChange}/>
      </p>
      <p>
        number:
        <input
          value={newNumber}
          onChange={handleNumberChange}/>
      </p>
      
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const ShowError = ({errorMessage}) => {
  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={errorStyle}>
      {errorMessage}
    </div>
  )
}

const ShowMessage = ({message}) => {
  const messageStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

const App = () => {

  useEffect(() => {
    Numbers
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterWord, setFilterWord ] = useState('')
  const [ errorMessage, setErrorMessage] = useState('')
  const [ message, setMessage ] = useState('')

  const addName = (event) => {
    event.preventDefault()

    if(!checkDups()) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        let person = persons.find(p => p.name===newName)
        person = {...person, number: newNumber}
        Numbers
          .updateOne(person)
          .then(response => {
            if(response) {
              setPersons(persons.map(p => p.name!==newName ? p : response.data))
              setMessage(`Updated information of ${newName}`)
              setTimeout(() => {
                setMessage('')
              }, 5000)
            }
          })
          .catch(error => {
            setErrorMessage(`Infromation of ${newName} has already been removed from the server`)
            setTimeout(() => {
              setErrorMessage('')
            }, 5000)
          })
      }
    } else {
      const personObject = {name: newName, number: newNumber}

      Numbers
        .create(personObject)
        .then(response => {
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage('')
          }, 5000)
          setPersons(persons.concat(response.data))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterWord(event.target.value)

  }

  const checkDups = () => {
    return persons.filter(p => p['name'] === newName).length===0
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage!=='' ?
       <ShowError errorMessage={errorMessage} />
       : ""}
      
      {message!=='' ?
       <ShowMessage message={message} />
       : ''}
      
      <FilterForm filterWord={filterWord} handleFilterChange={handleFilterChange} />

      <h1>add new</h1>
      <PersonForm addName={addName} handleNameChange={handleNameChange}
                  newName={newName} newNumber={newNumber}
                  handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ul>
        <MakeList persons={persons} setPersons={setPersons} filterWord={filterWord}
                  setMessage={setMessage}/>
      </ul>             
    </div>
  )

}

export default App

