// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorage(propertyName, initialProp) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const initProp = initialProp =>
    window.localStorage.getItem(propertyName) ?? initialProp
  const [prop, setProp] = React.useState(initProp)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  React.useEffect(() => {
    console.log('Taking effect.. pun intended, lol :P')
    window.localStorage.setItem(propertyName, prop)
  }, [propertyName, prop])

  return [prop, setProp]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorage('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  const [counter, setCounter] = React.useState(0)
  const handleClick = () => setCounter(counter => counter + 1)
  return (
    <>
      <button onClick={handleClick}>{counter}</button>
      <Greeting />
    </>
  )
}

export default App
