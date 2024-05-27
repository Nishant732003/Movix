import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { store } from './store/store.js'
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root")).render(
  //react.strictmode hatane se api ekbar hi call hogi nahin to do bar call hogi
  <Provider store={store}>
    <App />
  </Provider>
);
