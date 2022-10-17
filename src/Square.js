import React from "react";

function Square(props) {

    const style = {
        backgroundColor: props.isHeld ? "red" : "white"
    }

    return (
        <div 
        className="square"
        style={style}
        onClick={() => props.handleClick(props.id)}
        >{props.value}</div>
    )
}

export default Square