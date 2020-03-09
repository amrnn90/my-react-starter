import React from "react";

const render = ({ name, size, ...rest }) => (
  <svg
    className="icon"
    width={size}
    height={size}
    stroke="currentColor"
    fill="none"
    style={{
      verticalAlign: "middle",
      flexShrink: 0,
    }}
    {...rest}
  >
    <use xlinkHref={`#feather-sprite_svg__${name}`}></use>
  </svg>
);

const Icon = ({ name, size = "1em", ...rest }) => {
  /** STATE */

  /** METHODS */

  /** HANDLERS */

  /** EFFECTS */

  return render({ name, size, ...rest });
};

export default Icon;
