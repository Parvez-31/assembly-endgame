import { useState } from "react";
import { languages } from "./utils/languages";
import { getFarewellText } from "./utils/farewell";
import { clsx } from "clsx";

const App = () => {
  //state value
  const [currentWord, setCurrentWord] = useState("react");
  const [guessLetter, setGuessLetter] = useState([]);

  //drived value
  const wrongGuessCount = guessLetter.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  console.log(wrongGuessCount);

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessLetter.includes(letter));

  const isGameLost = wrongGuessCount >= languages.length;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessLetter[guessLetter.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);
  console.log(isLastGuessIncorrect);

  // handler Fn
  const handleGuess = (word) => {
    setGuessLetter((prevWord) =>
      prevWord.includes(word) ? prevWord : [...prevWord, word]
    );
  };
  /**
   * Challenge: Bid farewell to each programming language
   * as it gets erased from existance 👋😭
   *
   * Use the `getFarewellText` function from the new utils.js
   * file to generate the text.
   *
   * Check hint.md if you're feeling stuck, but do your best
   * to solve the challenge without the hint! 🕵️
   */

  //static value
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const letterElement = currentWord.split("");

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  });

  const randerGameStatus = () => {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="farewell-message">
          {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
      );
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }
    return null;
  };

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

        <section className={gameStatusClass}>{randerGameStatus()}</section>

        <section className="language-chips">
          {languages.map((lang, index) => {
            const className = clsx("chips", {
              lost: index < wrongGuessCount,
            });
            return (
              <span
                style={{
                  backgroundColor: lang.backgroundColor,
                  color: lang.color,
                }}
                className={className}
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
              disabled: isGameOver,
            });

            return (
              <button
                disabled={isGameOver}
                className={className}
                onClick={() => handleGuess(word)}
                key={word}
              >
                {word}
              </button>
            );
          })}
        </section>

        {isGameOver && <button className="new-game">New Game</button>}
      </main>
    </>
  );
};

export default App;
