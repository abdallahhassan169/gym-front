import React, { useState, useEffect } from "react";

const BarcodeScanner = ({ onScan }) => {
  const [barcodeData, setBarcodeData] = useState("");

  useEffect(() => {
    setInterval(() => setBarcodeData(""), 1000);
    const handleBarcodeScan = (event) => {
      // Extract barcode data from the input event
      const scannedData = event.key;

      if (scannedData === "Enter") {
        // If "Enter" is scanned, the barcode is complete
        // You can perform additional actions with the scanned data here
        console.log("Scanned data:", barcodeData);

        // Call the onScan function with the complete barcode data
        if (onScan) {
          onScan(barcodeData);
        }

        // Clear the barcode data after processing
        setBarcodeData("");
      } else {
        // Update the state with the scanned data
        setBarcodeData((prevData) => prevData + scannedData);
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener("keydown", handleBarcodeScan);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleBarcodeScan);
    };
  }, [barcodeData, onScan]); // Include barcodeData and onScan in the dependency array

  return;
};

export default BarcodeScanner;
