import Content from "./Content"

const Course =  (props) => {
    return (
      <div >
        <h1>{props.course.name}</h1>
        <Content parts={props.course.parts}/>
      </div>
    )
  }

  export default Course