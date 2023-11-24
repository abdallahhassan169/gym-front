import "./App.css";
import Main from "./custom/Main";
import { BrowserRouter as Router } from "react-router-dom";
import Test from "./Components/QrReader";
import gym from "./images/iron.jpeg";
import React from "react";
import { useState } from "react";
import BarcodeScannerComponent from "./Components/BarCodeScan";
import ImageDownloadComponent from "./Components/DownLoad";
import Scanner from "./Components/BarCodeScan";
import BarcodeScanner from "./Components/BarCodeScan";
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

  //...

  return (
    <>
      {showLogo ? (
        <img src={gym} alt="" style={{ width: "100%", height: "10%" }} />
      ) : (
        <Router>
          <div dir="rtl">
            <Main />
            <Test />
          </div>
        </Router>
      )}
    </>
  );
}
export default App;
