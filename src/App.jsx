import { useState } from "react";
import { languages } from "./utils/languages";
import { getFarewellText, getRandomWord } from "./utils/farewell";
import Confetti from "react-confetti";
import { clsx } from "clsx";

const App = () => {
  //state value
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  console.log(currentWord);

  const [guessLetter, setGuessLetter] = useState([]);

  //drived value
  const wrongGuessCount = guessLetter.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameWon = currentWord
    .split("")

    .every((letter) => guessLetter.includes(letter));

  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessLetter[guessLetter.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  // handler Fn
  const handleGuess = (word) => {
    setGuessLetter((prevWord) =>
      prevWord.includes(word) ? prevWord : [...prevWord, word]
    );
  };

  const resetGame = () => {
    setCurrentWord(getRandomWord());
    setGuessLetter([]);
  };
  /**
   * Backlog:
   *
   * ✅ Farewell messages in status section
   * ✅ Disable the keyboard when the game is over
   * ✅ Fix a11y issues
   * ✅ Choose a random word from a list of words
   * ✅ Make the New Game button reset the game
   * - Reveal what the word was if the user loses the game
   * - Confetti drop when the user wins
   *
   * Challenge: Reveal the missing letters of the word if the user
   * loses the game. Style the missing letters to have the same red
   * color as the wrong letter keys.
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
          <Confetti />
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
            const isGussed = guessLetter.includes(word);
            const isMissing = !isGussed && isGameOver;

            return (
              <span
                key={index}
                className={clsx("letter", {
                  wrong: isMissing,
                })}
              >
                {isGussed || isMissing ? word.toUpperCase() : ""}
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

        {isGameOver && (
          <button onClick={resetGame} className="new-game">
            New Game
          </button>
        )}
      </main>
    </>
  );
};

export default App;
