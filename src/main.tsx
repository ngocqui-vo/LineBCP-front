import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import liff from "@line/liff";
import "./App.css";
import "./i18n/config";
import "./style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

liff
  .init({ liffId: import.meta.env.VITE_LIFF_ID || "" })
  .then(() => {
    console.log(import.meta.env.VITE_LIFF_ID);
    const isLoggedIn = liff.isLoggedIn();
    alert(`is logged in: ${isLoggedIn}`);
    if (!isLoggedIn) {
      // localStorage.setItem("pathName", window.location.href);
      setTimeout(() => {
        liff.login();
      }, 500);
      return <div />;
    }
    return ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>,
      document.getElementById("root"),
    );
  })
  .catch((e) => {
    alert(`LIFF error: ${e.message}`);
  });
