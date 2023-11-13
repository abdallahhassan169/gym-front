import "./App.css";
import Main from "./custom/Main";
import { BrowserRouter as Router } from "react-router-dom";
import Test from "./custom/QrReader";

function App() {
  return (
    <Router>
      <div className="App" dir="rtl">
        <div style={{ marginBottom: "70px" }}>
          <Main />
        </div>
        <div style={{ marginTop: "100px" }}>
          <Test />
        </div>
      </div>
    </Router>
  );
}
export default App;
