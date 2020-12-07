import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Matrix from './components/Matrix'

function App() {
  const [matrix, setMatrix] = useState({
    size: 2,
    cells: [[0, 0, 0], [0, 0, 0]]
  })
  const changeValue = (row, col, value) => {
    let newMatrix = {...matrix}
    newMatrix.cells[row][col] = parseInt(value);
    setMatrix(newMatrix)
  }

  const generatePerms = (index, stack, fr, perm) => {
    if (index == matrix.size){
      const newStack = [...stack]
      perm.push(newStack)
      return;
    }
    for (let i = 1; i <= matrix.size; ++i){
      if (fr[i] == 0){
        fr[i] = 1
        stack[index] = i
        generatePerms(index + 1, stack, fr, perm)
        fr[i] = 0
      }
    }
  }

  const calculateDeterminant = () => {
    let perm = []
    let stack = new Array(matrix.size)
    let fr = new Array(matrix.size + 1)
    fr.fill(0)
    generatePerms(0, stack, fr, perm)
    let det = 0
    for (let i = 0; i < perm.length; ++i){
      let sign = 0
      let product = 1
      // to do: we can make this in O(nlogn)
      for (let j = 0; j < perm[i].length; ++j){
        product = product * matrix.cells[j][perm[i][j] - 1]
        for (let k = j + 1; k < perm[i].length; ++k){
          if (perm[i][j] > perm[i][k]){
            ++sign
          }
        }
      }
      if (sign % 2 === 0){
        sign = 1
      }
      else{
        sign = -1
      }
      det = det + sign * product
    }
    return det
  }

  const handleChange = (e) => {
    const cells = [];
    let size = parseInt(e.target.value)
    for (let i = 0; i < size; ++i){
      cells.push(new Array(size).fill(0))
    }
    for (let i = 0; i < Math.min(size, matrix.size); ++i){
      for (let j= 0; j < Math.min(size, matrix.size); ++j){
        cells[i][j] = matrix.cells[i][j]
      }
    }
    const newMatrix = {
      size: size,
      cells: cells
    }
    setMatrix(newMatrix)
  }
  return (
    <div className="App">
      <Matrix matrix = {matrix} changeValue = {changeValue}></Matrix>
      <select onChange = {handleChange}>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
      </select>
      <div>answer: {calculateDeterminant()}</div>
    </div>
  );
}

export default App;
