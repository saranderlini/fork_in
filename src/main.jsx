import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "./stylecss/main.css";
// import Background from "./components/Background";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";

ReactDOM.createRoot(document.getElementById("root")).render(

  <>
    <BrowserRouter>

      {/* <Background /> */}
      <Header />
    </BrowserRouter>
  </>
);
