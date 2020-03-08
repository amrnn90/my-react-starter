import React, { useState, useEffect } from "react";
import { css, Global } from "@emotion/core";

const render = ({ counter }) => (
  <>
    {globalStyles()}
    <div>Hello Counter: {counter}</div>
  </>
);

const App = () => {
  /** STATE */
  const [counter, setCounter] = useState(0);

  /** METHODS */

  /** HANDLERS */

  /** EFFECTS */

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter(counter + 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [counter]);

  return render({ counter });
};

const globalStyles = () => (
  <Global
    styles={css`
      body {
        background: #eee;
      }
    `}
  />
);

export default App;
