import "./App.css";
import Main from "./custom/Main";
import { BrowserRouter as Router } from "react-router-dom";
import Test from "./custom/QrReader";
import gym from "./gym2.jpeg";
import React from "react";
import { useState } from "react";
function App() {
  const [showLogo, setShowLogo] = useState(false);

  React.useEffect(() => {
    let mouseTimer;

    function handleMouseMove() {
      clearTimeout(mouseTimer);
      setShowLogo(false);
      mouseTimer = setTimeout(() => {
        setShowLogo(true);
      }, 60 * 3 * 1000);
    }

    function handleMouseDown() {
      clearTimeout(mouseTimer);
      setShowLogo(false);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);
  return (
    <>
      {showLogo ? (
        <img src={gym} alt="" style={{ width: "100%", height: "50%" }} />
      ) : (
        <Router>
          <div dir="rtl">
            <div style={{ marginBottom: "70px" }}>
              <Main />
            </div>
            <div style={{ marginTop: "100px" }}>
              <Test />
            </div>
          </div>
        </Router>
      )}
    </>
  );
}
export default App;
