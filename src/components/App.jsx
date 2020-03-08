import React, { useState, useEffect } from "react";
import { css, Global } from "@emotion/core";

const render = () => (
  <>
    {globalStyles()}
    <div>Hello World</div>
  </>
);

const App = () => {
  /** STATE */
  const [counter, setCounter] = useState(0);

  /** METHODS */

  /** HANDLERS */

  /** EFFECTS */

  useEffect(() => {
    console.log(counter);
    const intervalId = setInterval(() => {
      setCounter(counter + 1);
    }, 500);
    return () => {
      clearInterval(intervalId);
    };
  }, [counter]);

  return render();
};

const globalStyles = () => (
  <Global
    styles={css`
      body {
        background: teal;
      }
    `}
  />
);

export default App;
