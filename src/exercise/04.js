// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'

function Board() {
  const squares = Array(9).fill(null)
  for (let index = 0; index < 9; index++) {
    squares[index] = React.useState('')
  }

  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  function selectSquare(i) {
    if (squares[i][0] !== '') return

    if (winner === null) squares[i][1](nextValue)
  }

  function restart() {
    squares.forEach(element => {
      element[1]('')
    })
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i][0]}
      </button>
    )
  }

  return (
    <div>
      <div className="status">STATUS: {status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

function countFilled(squares) {
  let len = 0
  squares.forEach(element => {
    len = element[0] === 'X' || element[0] === 'O' ? len + 1 : len
  })
  return len
}

function isFilled(squares) {
  return countFilled(squares) === 9
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : isFilled(squares)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return countFilled(squares) % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (
      squares[a][0] &&
      squares[a][0] === squares[b][0] &&
      squares[a][0] === squares[c][0]
    ) {
      return squares[a][0]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
