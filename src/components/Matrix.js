import Cell from './Cell'
import './Matrix.css'
function Matrix(props) {
  const displayMatrix = () => {
    let arrayOfRows = []
    for (let row = 0; row < props.matrix.size; ++row){
      let arrayOfCols = []
      for (let col = 0; col < props.matrix.size; ++col){
        arrayOfCols.push(<Cell key = {col} row = {row} col = {col} changeValue = {props.changeValue}></Cell>)
      }
      arrayOfRows.push(<div key = {row} className = "row">{arrayOfCols}</div>)
    }
    return arrayOfRows
  }
  return (
    <div className="Matrix">
      {displayMatrix()}
    </div>
  );
}

export default Matrix
