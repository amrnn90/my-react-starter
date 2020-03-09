import React, { useState, useEffect } from "react";
import { css, Global } from "@emotion/core";
import FeatherSprite from "../svgs/feather-sprite.svg";
import Icon from "./Icon";

const render = ({ counter }) => (
  <>
    {globalStyles()}
    <FeatherSprite style={{ display: "none" }} />

    <div
      css={css`
        font-size: 3rem;
        color: purple;
      `}
    >
      <Icon name="check" color="green" />
      <span>Hello Counter: {counter}</span>
    </div>
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
      setCounter(counter + 10);
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
        line-height: 1.5;
      }

      span {
        vertical-align: middle;
      }
    `}
  />
);

export default App;
