import React  from 'react'
import {nanoid} from "nanoid"
import Die from './Components/Die'
import './index.css'
import Confetti from 'react-confetti'



function App() {
    const [dieNum, setDieNum] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [time, setTime] = React.useState(0);
    const [running, setRunning] = React.useState(false);
    const [rolls, setRolls] = React.useState(0);


    function Add() {
        setRolls(rolls + 1)
    }
 
    React.useEffect(() => {
        let intervalId;
    
        if (running) {
          intervalId = setInterval(() => {
            setTime(prevTime => prevTime + 1);
          }, 1000);
        }
    
        return () => {
          clearInterval(intervalId);
        };
      }, [running]);

      const startStopwatch = () => {
        setRunning(true);
      };
    
      const stopStopwatch = () => {
            setRunning(false);
      };
    
      const resetStopwatch = () => {
        setTime(0);
        setRunning(false);
      };

      function resetRolls () {
        setRolls(0)
      }
    
      const formatTime = time => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
    
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
    
        return `${formattedMinutes}:${formattedSeconds}`;
      };

    React.useEffect(()=> {
        const allHeld = dieNum.every(die => die.isHeld)
        const firstValue = dieNum[0].value
        const allSameValue = dieNum.every(die => die.value === firstValue)
        if(allHeld && allSameValue) {
            setTenzies(true)
            setRunning(false)
        }

    }, [dieNum])
    
    function generateNewDie() {
        return {
            
                value: Math.ceil(Math.random() * 6), 
                isHeld: false,
                Id: nanoid(),
                
            
        }
    }

    function allNewDice() {
        const newDice = []
        for(let i=0 ; i < 10 ; i++) {
            newDice.push(generateNewDie())
        }
         return newDice
    }

    function holdDice(Id) {
        setDieNum(oldDice => oldDice.map(die => {
            return die.Id === Id ?
            {...die, isHeld: !die.isHeld} : die
        }))
    }

    function rollDice() {
        if(!tenzies) {
            setDieNum(oldDice => oldDice.map(die => {
                return die.isHeld ? die :
                generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDieNum(allNewDice())
        }
        
    }


  const dieElements = dieNum.map(die => (<Die 
    value={die.value} 
    key={die.Id} 
    isHeld={die.isHeld}
    holdDice={()=> holdDice(die.Id)}
    /> ))

  return (
    <main>
        {tenzies && <Confetti /> }
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.</p>
        <p className="time">Time: {formatTime(time)}</p>
        <p className="best-time">Best Time: {time} </p>
         <p className="rolls-num">Rolls: {rolls} </p>
        <div className='dice-container'>
         {dieElements}
         {tenzies ? <button onClick={()=> {
            rollDice()
            resetStopwatch()
            startStopwatch()
            resetRolls()
        }}>New Game</button> : 
         <button onClick={()=> {
            rollDice()
            startStopwatch()

            Add()
            }} >Roll</button>}
        </div>
        
    </main>
  )
}

export default App
