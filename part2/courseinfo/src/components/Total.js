const Total = (props) => {
    let total = 0
    props.parts.forEach((part) => {
      total += part.exercises;
    })
  
  
    return (
      <h3>Total: {total}</h3>
    )
  
  }

export default Total