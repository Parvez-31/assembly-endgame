import { useState } from "react";
import { languages } from "./utils/languages";
import { clsx } from "clsx";

const App = () => {
  //state value
  const [currentWord, setCurrentWord] = useState("react");
  const [guessLetter, setGuessLetter] = useState([]);

  //drived value
  const wrongGuessCount = guessLetter.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGamewon = currentWord
    .split("")
    .every((letter) => guessLetter.includes(letter));
  console.log(isGamewon);
  const isGameLost = wrongGuessCount >= languages.length;
  const isGameOver = isGamewon || isGameLost;

  // handler Fn
  const handleGuess = (word) => {
    setGuessLetter((prevWord) =>
      prevWord.includes(word) ? prevWord : [...prevWord, word]
    );
  };
  /**
   * Backlog:
   *
   * - Farewell messages in status section
   * - Fix a11y issues
   * - Make the new game button work
   * - Choose a random word from a list of words
   * - Confetti drop when the user wins
   */

  //static value
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const letterElement = currentWord.split("");

  const gameStatusClass = clsx("game-status", {
    won: isGamewon,
    lost: isGameLost,
  });

  const randerGameStatus = () => {
    if (isGameOver) {
      if (isGamewon) {
        return (
          <>
            <h2>You win!</h2>
            <p>Well done! 🎉</p>
          </>
        );
      } else {
        return (
          <>
            <h2>Game over!</h2>
            <p>You lose! Better start learning Assembly 😭</p>
          </>
        );
      }
    } else {
      return null;
    }
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

        {isGameOver && <button className="new-game">New Game</button>}
      </main>
    </>
  );
};

export default App;
