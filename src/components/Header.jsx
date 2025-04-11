export default function Header({ remainingGuesses }) {
    return (
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
        <div className='game-info'>
          <span>Remaining guesses: {remainingGuesses}</span>
          <span>Remaining time: 01:00</span>
        </div>
      </header>
    )
}