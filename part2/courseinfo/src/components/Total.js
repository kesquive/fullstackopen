const Total = (props) => {
    
    const total = props.parts.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.exercises
    },0)
  
  
    return (
      <h3>Total: {total}</h3>
    )
  
  }

export default Total