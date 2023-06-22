const Header =  (props) => {

  return (
      <h1> {props.course}</h1>
  )
}

const Content =  (props) => {

  return (
    <div >
      <Part name={props.exercises[0].name} number ={props.exercises[0].number}/>
      <Part name={props.exercises[1].name} number ={props.exercises[1].number}/>
      <Part name={props.exercises[2].name} number ={props.exercises[2].number}/>
    </div>
  )
}

const Part =  (props) => {

  return (
      <p> Course:{props.name}   Exercises: {props.number}</p>
  )
}

const Total =  (props) => {

  return (
      <h3> Total: {props.total}</h3>
  )

}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const exercises = [
    { name: part1, number: exercises1 },
    { name: part2, number: exercises2 },
    { name: part3, number: exercises3 },
  ]

  return (
    <div>
      <Header course={course}/>
      <Content exercises={exercises} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App