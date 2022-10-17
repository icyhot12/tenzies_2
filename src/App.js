import React from "react";
import Square from "./Square";
import { nanoid } from "nanoid"

function App() {

  const [squares, setSquares] = React.useState(newSquares())
  const [win, setWin] = React.useState(false)

  React.useEffect(() => {
    const allHeld = squares.every(square => square.isHeld)
    const firstValue = squares[0].value
    const allValues = squares.every(square => square.value === firstValue)
    if(allHeld && allValues) {
      setWin(true)
    }
  }, [squares])

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

    setSquares(prevSquare => (
      prevSquare.map(element => {
        return element.id === id ?
          { ...element, isHeld: !element.isHeld } :
          element
      })
    ))
  }


  function handleRoll() {

    if (win) {
      setSquares(prevSquare => (
        prevSquare.map(element => {
          return {
            ...element,
            isHeld: false,
            value: Math.ceil(Math.random() * 6)
          }
        })
      ))
      setWin(false)

    } else {
      setSquares(prevSquare => (
        prevSquare.map(element => {
          return element.isHeld ?
            element :
            { ...element, value: Math.ceil(Math.random() * 6) }
        })
      ))
    }


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
