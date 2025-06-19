import { languages } from "./utils/languages";

const App = () => {
  /**
   * Goal: Build out the main parts of our app
   *
   * Challenge: Create the language chips. Use the
   * `languages.js` file to pull in the array of
   * languages to use, which contains the language
   * name, background color, and text color.
   *
   * Hint for layout: use a flex container that can wrap
   * to layout the languages.
   */
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
      </main>
    </>
  );
};

export default App;
