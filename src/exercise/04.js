// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function useLocalStorageToSaveHistory(
  key,
  gameState,
  setGameState,
  gameViewLevel,
) {
  const s = window.localStorage.getItem(key)
  const updateValue = JSON.parse(s) ?? Array(9).fill(null)
  const [v, setV] = React.useState(updateValue)
  React.useEffect(() => {
    if (gameState === -1) {
      setV(Array(9).fill(null))
      setGameState(0)
    }
    window.localStorage.setItem(key, JSON.stringify(v))
  }, [key, v, gameState])
  const setIndex = x => {
    const vCopy = [...v]
    for (let index = gameState; index < 9; index++) {
      vCopy[index] = x
    }
    setV(vCopy)
  }

  return [v[gameViewLevel], setIndex]
}

function Board() {
  const [gameState, setGameState] = useLocalStorageState('gameState', 0)
  const [gameViewLevel, setGameViewLevel] = useLocalStorageState(
    'gameViewLevel',
    0,
  )
  const squares = Array(9).fill(null)
  for (let index = 0; index < 9; index++) {
    squares[index] = useLocalStorageToSaveHistory(
      index,
      gameState,
      setGameState,
      gameViewLevel,
    )
  }

  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  function selectSquare(i) {
    if (winner || squares[i][0]) return
    squares[i][1](nextValue)
    if (gameState < 8 && gameViewLevel < 8) {
      setGameState(gameState + 1)
      setGameViewLevel(gameViewLevel + 1)
    }
  }

  function restart() {
    setGameState(-1)
    setGameViewLevel(0)
    squares.forEach(element => {
      element[1]('')
    })
  }

  function renderSquare(i) {
    return (
      <button
        disabled={gameState === -1 || gameViewLevel !== gameState}
        className="square"
        onClick={() => selectSquare(i)}
      >
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
        Restart
      </button>
      <div>
        <button disabled={gameState <= 0} onClick={() => setGameViewLevel(0)}>
          Go to Game Start
        </button>
        <button disabled={gameState <= 1} onClick={() => setGameViewLevel(1)}>
          Go to second move
        </button>
        <button disabled={gameState <= 2} onClick={() => setGameViewLevel(2)}>
          Go to third move
        </button>
        <button disabled={gameState <= 3} onClick={() => setGameViewLevel(3)}>
          Go to fourth move
        </button>
        <button disabled={gameState <= 4} onClick={() => setGameViewLevel(4)}>
          Go to fifth move
        </button>
        <button disabled={gameState <= 5} onClick={() => setGameViewLevel(5)}>
          Go to sixth move
        </button>
        <button disabled={gameState <= 6} onClick={() => setGameViewLevel(6)}>
          Go to seventh move
        </button>
        <button disabled={gameState <= 7} onClick={() => setGameViewLevel(7)}>
          Go to Last move
        </button>
        <button
          onClick={() =>
            gameState !== -1 ? setGameViewLevel(gameState) : setGameViewLevel(0)
          }
        >
          Back to current move
        </button>
      </div>
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
