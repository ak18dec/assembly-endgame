import { useState } from 'react'
import './App.css'
import { languages } from './data/languages.js'
import { clsx } from 'clsx'
import { getRandomWord } from './utils/utils.js'
import Confetti from 'react-confetti'
import Header from './components/Header.jsx'
import GameStatus from './components/GameStatus.jsx'

function App() {

  // State values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])

  console.log(currentWord)

  // Derived values
  const numGuessesLeft = languages.length - 1
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isGameWon = currentWord.split('').every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= numGuessesLeft
  const isGameOver = isGameWon || isGameLost
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1] 
  
  
  // Static  values
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'

  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters => 
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    )
  }

  function startNewGame() {
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
  }

  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount

    return (
      <span 
        className={`chip ${isLanguageLost ? 'lost' : ''}`}
        style={{
          backgroundColor: lang.backgroundColor,
          color: lang.color
        }}
        key={lang.name}
      >
        {lang.name}
      </span>
    )
  })

  const letterElements = currentWord.split('').map((letter, index) => {
    
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

  const keyboardElements = alphabet.split('').map(letter => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !currentWord.includes(letter)

    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
    })

    return (
      <button 
      key={letter} 
      onClick={() => addGuessedLetter(letter)}
      disabled={isGameOver}
      aria-disabled={guessedLetters.includes(letter)}
      aria-label={`Letter ${letter}`}
      className={className}
      >
        {letter.toUpperCase()}
      </button>
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
      <Header />
      <GameStatus
        languages={languages} 
        isGameOver={isGameOver}
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        wrongGuessCount={wrongGuessCount}
        currentWord={currentWord}
        lastGuessedLetter={lastGuessedLetter}
      />
      
      <section className='language-chips'>
        {languageElements}
      </section>
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
                    {currentWord.includes(lastGuessedLetter) ? 
                        `Correct! The letter ${lastGuessedLetter} is in the word.` : 
                        `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                    }
                    You have {numGuessesLeft} attempts left.
                </p>
                <p>Current word: {currentWord.split("").map(letter => 
                guessedLetters.includes(letter) ? letter + "." : "blank.")
                .join(" ")}</p>
            
            </section>
      <section className='keyboard'>
        {keyboardElements}
      </section>
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
