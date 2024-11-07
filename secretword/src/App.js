
// css
import './App.css';

// componentes
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';
import { wordsList } from './data/words';

//react
import {useCallback, useState, useEffect} from 'react';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
];

const guessesNum= 5;

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList);

  const[pickedCategory, setPickedCategory] = useState("");
  const[pickedWord, setpickedWord] = useState("");
  const[letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesNum)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {

    // escolhendo a categoria aleatoriamente
    const categories = Object.keys(words);

    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];


    //escolhendo a palavra

    const word = words[category][Math.floor(Math.random() * words[category].length)]

   

    return{word, category}
  }, [words])
 
  const startGame = useCallback(() => {
    clearLetterState()

    const {word, category} = pickWordAndCategory();
    let wordLetter = word.split("");

    wordLetter = wordLetter.map((l) => l.toLowerCase(l));

    setLetters(wordLetter);
    setPickedCategory(category)
    setpickedWord(word)

    setGameStage(stages[1].name)
  }, [pickWordAndCategory]);

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if(guessedLetters.includes(normalizedLetter) || 
    wrongLetters.includes(normalizedLetter)){
      return;
    }
    
    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ]);

      setGuesses((actualGuess) => actualGuess -1);

    }
  };

  const clearLetterState = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  // resetar os estados
  useEffect(() => {
    if(guesses <= 0){
      clearLetterState();

      setGameStage(stages[2].name)
    }
  }, [guesses]);

  // verificar condicao de vitoria 
  useEffect(() => {
    const uniqueLetters = [... new Set(letters)]

    // condicao de vitoria 

    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore) => actualScore + 100)

      startGame();
    }

  }, [guessedLetters, letters, startGame])

  // resetar o jogo
 const retry = () => {
  setScore(0)
  setGuesses(guessesNum)

  setGameStage(stages[0].name)
 }

  

  return (
    <div className="App">
     {gameStage === "start" && <StartScreen startGame={startGame}/>}
     {gameStage === "game" && <Game 
     verifyLetter={verifyLetter}
     pickedWord={pickedWord}
     pickedCategory={pickedCategory}
     letters={letters}
     guessedLetters={guessedLetters}
     wrongLetters={wrongLetters}
     guesses={guesses}
     score={score}
     />}
     {gameStage === "end" && <GameOver retry={retry} 
     score={score}
     
     />}

    </div>
  );
}

export default App;
