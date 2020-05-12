import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const anecs = props.anecdotes
  const [points, setPoints] = useState(props.points)

  return (
    <Print anecs={anecs} points={points} setPoints={setPoints}
           selected={selected} setSelected={setSelected} />
  )
}

const Print = ({anecs, points, setPoints, selected, setSelected}) => {
  const copy = [...points]
  copy[selected] += 1

  let max = points.reduce(function(a, b) {
    return Math.max(a, b)
  });

  //ensimmäinen suurimman pistemäärän indeksi
  let ind = 0;
  for(let i=points.length-1; i>-1; i--) {
    if(points[i]===max) {
      ind = i;
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecs[selected]}</p>
      <p>has {points[selected]} votes</p>
      
      <button 
        onClick={() => setPoints(copy)}>
        vote
      </button>
      
      <button
        onClick={() => setSelected(Math.floor(Math.random()*Math.floor(6)))}>
        next anecdote
      </button>

      <div>
        <h2>Anecdote with most votes</h2>
        <p>{anecs[ind]}</p>
        <p>has {max} votes</p>
      </div>

    </div>
  )
}

const points = [0, 0, 0, 0, 0, 0]
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} points={points} />,
  document.getElementById('root')
)
