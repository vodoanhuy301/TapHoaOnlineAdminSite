import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { Provider } from "react-redux";
import { storeAdmin, persistorAdmin } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.render(
  <Provider store={storeAdmin}>
    <PersistGate loading={null} persistor={persistorAdmin}>
    <App />
    </PersistGate>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

