// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting() {
  const initialName = 'Harshu'
  let [greeting, setGreeting] = React.useState('Hello ' + initialName)

  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    setGreeting(greeting => (greeting = 'Hello ' + event.target.value))
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input defaultValue={initialName} onChange={handleChange} id="name" />
      </form>
      {greeting ? <strong>{greeting}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
