import ReactDOM from "react-dom/client";
import "./App/index.css";
import App from "./App/App";
import { StoreProvider } from "./App/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
