import { useState } from "react";
import { languages } from "./utils/languages";

const App = () => {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessLetter, setGuessLetter] = useState([]);
  console.log(guessLetter);

  // handler Fn
  const handleGuess = (word) => {
    setGuessLetter((prevWord) =>
      prevWord.includes(word) ? prevWord : [...prevWord, word]
    );
  };

  /**
   * Goal: Allow the user to start guessing the letters
   *
   * Challenge: Update the keyboard when a letter is right
   * or wrong.
   *
   * Bonus: use the `clsx` package to easily add conditional
   * classNames to the keys of the keyboard. Check the docs
   * to learn how to use it 📖
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
            return <span key={index}>{word.toUpperCase()}</span>;
          })}
        </section>

        <section className="keyboard">
          {alphabet.split("").map((word, index) => {
            return (
              <button onClick={() => handleGuess(word)} key={word}>
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
