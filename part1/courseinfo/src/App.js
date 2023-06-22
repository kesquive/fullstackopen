const Header =  (props) => {

  return (
      <h1> {props.course}</h1>
  )
}

const Content =  (props) => {

  return (
    <div >
      <Part name={props.parts[0].name} number ={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} number ={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} number ={props.parts[2].exercises}/>
    </div>
  )
}

const Part =  (props) => {

  return (
      <p> Course:{props.name}   Exercises: {props.number}</p>
  )
}

const Total = (props) => {
  let total = 0
  props.parts.forEach((part) => {
    total += part.exercises;
  })


  return (
    <h3>Total: {total}</h3>
  )

}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App