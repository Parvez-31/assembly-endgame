import { useState } from "react";
import { languages } from "./utils/languages";
import { clsx } from "clsx";

const App = () => {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessLetter, setGuessLetter] = useState([]);
  // console.log(guessLetter);

  // handler Fn
  const handleGuess = (word) => {
    setGuessLetter((prevWord) =>
      prevWord.includes(word) ? prevWord : [...prevWord, word]
    );
  };

  /**
   * Goal: Allow the user to start guessing the letters
   *
   * Challenge: Only display the correctly-guessed letters
   * in the word
   */

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const letterElement = currentWord.split("");

  return (
    <>
      <main>
        <header>
          <h1>Assembly: Endgame</h1>
          <p>
            Guess the word in under 8 attempts to keep the programming world
            safe from Assembly!
          </p>
        </header>

        <section className="game-status">
          <h2>You Win!</h2>
          <p>Well done!🎉</p>
        </section>

        <section className="language-chips">
          {languages.map((lang, index) => {
            return (
              <span
                style={{
                  backgroundColor: lang.backgroundColor,
                  color: lang.color,
                }}
                className="chip"
                key={lang.name}
              >
                {lang.name}
              </span>
            );
          })}
        </section>

        <section className="word">
          {letterElement.map((word, index) => {
            return (
              <span key={index}>
                {guessLetter.includes(word) ? word.toUpperCase() : ""}
              </span>
            );
          })}
        </section>

        <section className="keyboard">
          {alphabet.split("").map((word, index) => {
            const isGuessed = guessLetter.includes(word);
            const isCorrect = isGuessed && currentWord.includes(word);
            const isWrong = isGuessed && !currentWord.includes(word);

            const className = clsx({
              correct: isCorrect,
              wrong: isWrong,
            });

            return (
              <button
                className={className}
                onClick={() => handleGuess(word)}
                key={word}
              >
                {word}
              </button>
            );
          })}
        </section>

        <button className="new-game">New Game</button>
      </main>
    </>
  );
};

export default App;
