import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import initReactFastclick from "react-fastclick";
initReactFastclick();

ReactDOM.render(<App />, document.getElementById("root"));
