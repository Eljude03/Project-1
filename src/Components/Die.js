import React from "react"

export default function Die(props) {
    const style = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return(
        <div 
        className="dice" 
        style={style}
        onClick={props.holdDice}
        >
            <h2 className="die-num">{props.value} </h2>
        </div>
    )
}