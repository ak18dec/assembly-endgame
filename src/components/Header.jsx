import { useEffect, useRef } from "react"

export default function Header({ remainingGuesses, isGameOver, timer, setTimerOn }) {

  const timerElement = useRef(null)
  const counter = useRef(null)
  const time = 120

  useEffect(() => {
    if(timerElement.current !== null && !isGameOver){
      counter.current = timer(timerElement.current, time)
    }else if(isGameOver) {
      clearInterval(counter.current)
      setTimerOn(false)
    }
    return () => clearInterval(counter.current); // cleanup on unmount or dependency change
  }, [isGameOver])

  return (
    <header>
      <h1>Assembly: Endgame</h1>
      <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
      <div className='game-info'>
        <span>Remaining guesses: {remainingGuesses}</span>
        <span ref={timerElement}></span>
      </div>
    </header>
  )
}