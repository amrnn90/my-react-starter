import { hot } from "react-hot-loader/root";
import React from "react";
import ReactDOM from "react-dom";
import App_ from "./components/App";
import "./styles/app.scss";

const App = hot(App_);

ReactDOM.render(<App />, document.querySelector("#root"));
