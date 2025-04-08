import { useState } from 'react'
import './App.css'
import { languages } from './languages'

function App() {

  const [currentWord, setCurrentWord] = useState('react')
  const [guessedLetters, setGuessedLetters] = useState([])
  console.log(guessedLetters)

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'

  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters => 
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    )
  }

  const languageElements = languages.map(lang => (
    <span 
      className='chip' 
      style={{
        backgroundColor: lang.backgroundColor,
        color: lang.color
      }}
      key={lang.name}
    >
      {lang.name}
    </span>
  ))

  const letterElements = currentWord.split('').map((letter, index) => (
    <span key={index}>{letter.toUpperCase()}</span>
  ))

  const keyboardElements = alphabet.split('').map(letter => (
    <button 
      key={letter} 
      onClick={() => addGuessedLetter(letter)}
    >
      {letter.toUpperCase()}
    </button>
  ))

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className='game-status'>
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className='language-chips'>
        {languageElements}
      </section>
      <section className='word'>
        {letterElements}
      </section>
      <section className='keyboard'>
        {keyboardElements}
      </section>
      <button className='new-game'>New Game</button>
    </main>
  )
}

export default App
