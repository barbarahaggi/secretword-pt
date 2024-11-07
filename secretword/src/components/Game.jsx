import React from 'react'
import { useState, useRef } from 'react'
import './Game.css'

const Game = ({
     verifyLetter,
     pickedWord,
     pickedCategory,
     letters,
     guessedLetters,
     wrongLetters,
     guesses,
     score,
}) => {

  const [letter, setLetter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);
    setLetter("")

    letterInputRef.current.focus();
  }

  const letterInputRef = useRef(null)

  return (
    

   <div className="game">
    <p className="points">
      <span>Pontuação: {score}</span>
    </p>
    <h1>Adivinhe a palavra:</h1>
    <h3 className="tip">Dica sobre a palavra:
      <span>{pickedCategory}</span>
    </h3>
    <p>Você ainda tem {guesses} tentativas.</p>


    <div className="wordContainer">
      {letters.map((letter, i) => 
      guessedLetters.includes(letter) ? (
      <span className="letter" key={i}>
        {letter}
        </span>) 
      
      : (<span key={i} className="blankSquare"></span>) 
      
    
    )}
    </div>

    <div className="letterContainer">
      <p>Tente adivinhar uma letra da palavra:</p>
      <form onSubmit={handleSubmit}>
        <input type="text" 
        name="letter" 
        maxLength="1" 
        required 
        onChange={(e) => setLetter(e.target.value)}
        value={letter}
        ref={letterInputRef}
        />
        <button>Jogar</button>
      </form>
    </div>
    <div className="wrongLettersContainer">
      <p>letras ja utilizadas:</p>
      {wrongLetters.map((letters, i) => (
        <span key={i}>{letters}, </span>
      ))}
    </div>
   </div>
  )
}

export default Game