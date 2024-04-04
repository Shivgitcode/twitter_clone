import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppContextProvider>
    <BrowserRouter>
      <App />
      <Toaster/>
    </BrowserRouter>
  </AppContextProvider>
);
