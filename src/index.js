import React from "react";
import ReactDOM from "react-dom";
import 'react-toastify/dist/ReactToastify.min.css';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./app/layout/App";
import configureStore from "./app/store/configureStore";
import { loadEmployees } from "./features/dashboard/employees/employeesActions";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
axios.defaults.baseURL = "http://api.certusbase.com/api/v1/";

const store = configureStore();
// store.dispatch(loadEmployees())

const rootEl = document.getElementById("root");

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    rootEl
  );
}
if (module.hot) {
  module.hot.accept("./app/layout/App", function () {
    setTimeout(render);
  });
}
render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
