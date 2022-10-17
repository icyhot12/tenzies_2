import React from "react";
import Square from "./Square";
import { nanoid } from "nanoid"

function App() {

  const [squares, setSquares] = React.useState(newSquares())
  const [win, setWin] = React.useState(false)

  function newSquares() {
    let tempArray = []

    for (let i = 0; i < 10; i++) {
      tempArray.push(
        {
          key: nanoid(),
          id: nanoid(),
          value: Math.ceil(Math.random() * 6),
          isHeld: false
        }
      )
    }

    return tempArray
  }

  function handleClick(id) {
    check()
    
    setSquares(prevSquare => (
      prevSquare.map(element => {
        return element.id === id ?
          { ...element, isHeld: !element.isHeld } :
          element
      })
    ))
  }

  function check() {
    let counter = 0
    let finalValue = squares[0].value

    for (let i = 0; i < 10; i++) {
      if (squares[i].isHeld === true && squares[i].value === finalValue) {
        counter++
      }
      if (counter === 10) {
        setWin(true)
      }
    }
    if (win === true) {
      alert("You win!!!")
    }
  }

  function handleRoll() {

    check()

    setSquares(prevSquare => (
      prevSquare.map(element => {
        return element.isHeld ?
          element :
          { ...element, value: Math.ceil(Math.random() * 6) }
      })
    ))

  }

  const squareElements = squares.map(element => (
    <Square
      key={element.key}
      id={element.id}
      value={element.value}
      isHeld={element.isHeld}
      handleClick={handleClick}
    />
  ))

  return (
    <div className="main-container">
      <div className="title">Tenzies</div>
      <div className="boxes-container">
        {squareElements}
      </div>
      <div className="btn-container">
        <button onClick={handleRoll}>{win ? "Reset" : "Roll"}</button>
      </div>
    </div>
  );
}

export default App;
