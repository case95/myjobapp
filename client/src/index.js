import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//Redux
import { createStore } from "redux";
import reducer from "./store/reducer";

//React-Redux package connects React to Redux thanks to the <Provider/> tag.
//Provider is an help component which helps us to "inject" the store in our React components.
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
