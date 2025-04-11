import { clsx } from 'clsx'

export default function Keyboard({ guessedLetters, addGuessedLetter, isGameOver, word }) {

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    
    return (
        <section className='keyboard'>
        {alphabet.split('').map(letter => {
            const isGuessed = guessedLetters.includes(letter)
            const isCorrect = isGuessed && word.includes(letter)
            const isWrong = isGuessed && !word.includes(letter)
    
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
    })}
      </section>
    )
}