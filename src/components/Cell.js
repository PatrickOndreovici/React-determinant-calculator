import './Cell.css'

function Cell(props) {
    const handleChange = (e) => {
        props.changeValue(props.row, props.col, e.target.value)
    }
    return (
      <div className="Cell">
          <input onChange = {handleChange}></input>
      </div>
    );
  }
  
  export default Cell
  