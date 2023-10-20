import logo from "./logo.svg";
import "./App.css";
import Main from "./custom/Main";
import { BrowserRouter as Router } from "react-router-dom";
import NewUser from "./custom/NewUser";
import Test from "./custom/QrReader";
import CostForm from "./custom/CostForm";
import Reports from "./custom/Reports";

function App() {
  return (
    <Router>
      <div className="App" dir="rtl">
        <Main />
        <Test />
      </div>
    </Router>
  );
}
export default App;
