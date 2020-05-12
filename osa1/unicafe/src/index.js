import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const printStats = ({good, neutral, bad, all, average, positive}) => {
  return (
    <div>
      <StatisticsLine text="good" value={good} end="" />
      <StatisticsLine text="neutral" value={neutral} end="" />
      <StatisticsLine text="bad" value={bad} end=""/>
      <StatisticsLine text="all" value={all} end=""/>
      <StatisticsLine text="average" value={average} end="" />
      <StatisticsLine text="positive" value={positive} end="%" />
    </div>
  )
}

const printNoStats = () => {
  return (
    <div>
      <p>no feedback given</p>
    </div>
  )
}

const Statistics = ({good, neutral, bad, all, average, positive}) => {

  return(
    <div>
      <h1>statistics</h1>
      {good===0 && neutral===0 && bad===0 ?
       printNoStats() : printStats({good, neutral, bad, all, average, positive})}
    </div>
  )
}

const StatisticsLine = (props) => (
  <p>{props.text} {props.value} {props.end}</p> 
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const setToGood = ({setGood, setAll, setStats, stats}) => {
  setGood(stats.good + 1)
  setAll(stats.all + 1)
  const newStats = {
    ...stats,
    good: stats.good+1,
    all: stats.all+1,
    average: ((stats.good+1)-stats.bad)/(stats.all+1),
    positive: (stats.good+1)/(stats.all+1)*100
  }
  setStats(newStats)
}

const setToNeutral = ({setNeutral, setAll, setStats, stats}) => {
  setNeutral(stats.neutral + 1)
  setAll(stats.all + 1)
  const newStats = {
    ...stats,
    neutral: stats.neutral+1,
    all: stats.all+1,
    average: (stats.good-stats.bad)/(stats.all+1),
    positive: stats.good/(stats.all+1)*100
  }
  setStats(newStats)
}

const setToBad = ({setBad, setAll, setStats, stats}) => {
  setBad(stats.bad + 1)
  setAll(stats.all + 1)
  const newStats = {
    ...stats,
    bad: stats.bad+1,
    all: stats.all+1,
    average: (stats.good-(stats.bad+1))/(stats.all+1),
    positive: stats.good/(stats.all+1)*100
  }
  setStats(newStats)
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [stats, setStats] = useState({
    good: 0, neutral: 0, bad: 0,
    all: 0, average: 0, positive: 0
  })


  return (
    <div>
      <h1>give feedback</h1>
      <Button
        handleClick={() => setToGood({setGood, setAll, setStats, stats})}
        text="good" />
      <Button
        handleClick={() => setToNeutral({setNeutral, setAll, setStats, stats})}
        text="neutral" />
      <Button
        handleClick={() => setToBad({setBad, setAll, setStats, stats})}
        text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all}
                  average={stats.average} positive={stats.positive}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
