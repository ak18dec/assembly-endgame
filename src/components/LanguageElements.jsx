import { clsx } from 'clsx'

export default function LanguageElements({ languages, wrongGuessCount }) {

    return (
        <section className='language-chips'>
            {languages.map((lang, index) => {
                const className = clsx('chip', {
                    lost: index < wrongGuessCount
                })
                
                return (
                    <span
                        key={lang.name}
                        className={className}
                        style={{
                            backgroundColor: lang.backgroundColor,
                            color: lang.color
                        }}
                    >
                        {lang.name}
                    </span>
                )
            })}
        </section>
    )
}