import React from "react";
import Square from "./Square";
import { nanoid } from "nanoid"

function App() {

  const [squares, setSquares] = React.useState(newSquares())

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
        {...element, isHeld: !element.isHeld} :
        element
      })
    ))
  }

  function handleRoll() {
    setSquares(prevSquare => (
      prevSquare.map(element => {
        return element.isHeld ? 
        element :
        {...element, value: Math.ceil(Math.random() * 6)}
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
        <button onClick={handleRoll}>Roll</button>
      </div>
    </div>
  );
}

export default App;
