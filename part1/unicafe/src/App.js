import { useState } from 'react'


const Display = props => <div>{props.text} {props.value}</div>

const Button = (props) => { 
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  if (total > 0) {
    return (
      <div>
        <Display text='good' value={good} />
        <Display text='neutral' value={neutral} />
        <Display text='bad' value={bad} />
        <Display text='all' value={total} />
        <Display text='average' value={(good -bad) / total} />
        <Display text='positive' value={`${(good / total) * 100}%`} />
      </div>
    ) 
  }

  return (
    <div>No feedback given</div>
  )

}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updateGood = good + 1
    setGood(updateGood)
  }

  const handleNeutralClick = () => {
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
  }

  const handleBadClick = () => {
    const updateBad= bad + 1
    setBad(updateBad)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App