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


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updateGood = good + 1
    setGood(updateGood)

    const total = neutral + bad + updateGood
    setTotal(total)

    const average = (updateGood - bad) / total
    setAverage(average)

    const positive = (updateGood / total) * 100
    setPositive(positive)
  }

  const handleNeutralClick = () => {
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)

    const total = good + bad + updateNeutral
    setTotal(good + bad + updateNeutral)

    const positive = (good / total) * 100
    setPositive(positive)
  }

  const handleBadClick = () => {
    const updateBad= bad + 1
    setBad(updateBad)
    
    const total = neutral + good + updateBad
    setTotal(total)
    
    const average = (good - updateBad) / total
    setAverage(average)

    const positive = (good / total) * 100
    setPositive(positive)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />

      <h1>statistics</h1>
      <Display text='good' value={good} />
      <Display text='neutral' value={neutral} />
      <Display text='bad' value={bad} />
      <Display text='all' value={total} />
      <Display text='average' value={average} />
      <Display text='positive' value={`${positive}%`} />
    </div>
  )
}

export default App