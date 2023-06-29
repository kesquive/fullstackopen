import { useState } from 'react'


const Display = props => <div>{props.value}</div>


const Button = (props) => { 
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = () => {
  
  //la asignacionde useState es asincrona, por eso el valor se guarda
  //en una constante, sino, no se refleja
  const [left,setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  // la asigancion de useState nunca debe usarse en ciclos e if
  // solo en la declaracion de un componente
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updateLeft = left + 1
    setLeft(updateLeft)
    setTotal(updateLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updateRight = right + 1
    setRight(updateRight)
    setTotal(left + updateRight)
  }

  return (
    <div>
      <Display value={total}/>
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      <History allClicks={allClicks} />
    </div>
  )
}

export default App