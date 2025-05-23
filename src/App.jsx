import { useState } from 'react'
import './App.css'
import { languages } from './data/languages.js'
import { clsx } from 'clsx'
import { getRandomWord } from './utils/utils.js'
import Confetti from 'react-confetti'
import Header from './components/Header.jsx'
import GameStatus from './components/GameStatus.jsx'
import LanguageElements from './components/LanguageElements.jsx'
import Keyboard from './components/Keyboard.jsx'
import { formatTime } from './utils/time.js'

const totalGuessLimit = languages.length - 1

function App() {

  // State values
  const [word, setWord] = useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])
  const [timerOn, setTimerOn] = useState(true)

  // Derived values
  const wrongGuessCount = guessedLetters.filter(letter => !word.includes(letter)).length
  const remainingGuesses = totalGuessLimit - wrongGuessCount
  const isGameWon = word.split('').every(letter => guessedLetters.includes(letter))
  const isGameOver = isGameWon || remainingGuesses < 1 || !timerOn
  const isGameLost = isGameOver && !isGameWon
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1] 
  
  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters => 
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    )
  }

  // Add timer to the game
  function timer(element, time) {
    const timeLabel = 'Remaining time:'
    element.textContent = `${timeLabel} ${formatTime(time)}`
    const counter = setInterval(() => {
        time--
        element.textContent = `${timeLabel} ${formatTime(time)}`
        if(time==0) {
          element.textContent = `Time's up`
          setTimerOn(false)
          clearInterval(counter)
        }
    }, 1000)
    return counter
  }

  function startNewGame() {
    setWord(getRandomWord())
    setGuessedLetters([])
    setTimerOn(true)
  }

  const letterElements = word.split('').map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
    const letterClassName = clsx(
      isGameLost && !guessedLetters.includes(letter) && 'missed-letter'
    )

    return (
      <span key={index} className={letterClassName}>
        { shouldRevealLetter ? letter.toUpperCase() : '' }
      </span>
    )
  })

  return (
    <main>
      {
        isGameWon && 
          <Confetti 
            recycle={false} 
            numberOfPieces={1000} 
            width={window.innerWidth || 300}
            height={window.innerHeight || 200}
          />
      }
      <Header 
        remainingGuesses={remainingGuesses}
        isGameOver={isGameOver}
        timer={timer}
        setTimerOn={setTimerOn}
      />
      <GameStatus
        languages={languages} 
        isGameOver={isGameOver}
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        wrongGuessCount={wrongGuessCount}
        word={word}
        lastGuessedLetter={lastGuessedLetter}
      />
      <LanguageElements
        languages={languages}
        wrongGuessCount={wrongGuessCount} 
      />
      <section className='word'>
        {letterElements}
      </section>
      {/* Combined visually-hidden aria-live region for status updates */}
      <section 
        className="sr-only" 
        aria-live="polite" 
        role="status"
      >
        <p>
            {word.includes(lastGuessedLetter) ? 
                `Correct! The letter ${lastGuessedLetter} is in the word.` : 
                `Sorry, the letter ${lastGuessedLetter} is not in the word.`
            }
            You have {remainingGuesses} attempts left.
        </p>
        <p>Current word: {word.split("").map(letter => 
        guessedLetters.includes(letter) ? letter + "." : "blank.")
        .join(" ")}</p>
            
      </section>
      <Keyboard
        guessedLetters={guessedLetters}
        addGuessedLetter={addGuessedLetter}
        isGameOver={isGameOver}
        word={word}
      />
      {isGameOver && 
        <button 
          className='new-game'
          onClick={startNewGame}
        >
          New Game
        </button>}
    </main>
  )
}

export default App
