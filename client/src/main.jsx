import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./context/AuthContext.jsx";

Modal.setAppElement("#root");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar
        toastStyle={{
          fontFamily: "Work Sans",
        }}
        toastClassName="border rounded-xl text-sm font-medium shadow-none"
      />
    </BrowserRouter>
  </StrictMode>
);
