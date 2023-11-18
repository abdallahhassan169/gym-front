import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import UserCard from "../custom/Users/UserCard";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
const Test = () => {
  const [delay, setDelay] = useState(100);
  const [user, setUser] = useState();
  const [result, setResult] = useState("No result");
  const [handler, setHandler] = useState(false);

  const handleScan = (data) => {
    setResult(data);
    if (data) {
      setHandler(true);
      axios
        .post("http://127.0.0.1:3012/scan", { code: data.text })
        .then((res) => {
          setUser(res.data ?? { id: null });
          console.log(res.data, "datattatata");
        });
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      {/* set qr reader opposite of modal state */}
      {!handler && (
        <QrReader
          delay={delay}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
      )}
      <p>{result?.text}</p>
      <Modal
        open={handler}
        onClose={() => setHandler(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UserCard user_id={user} />
        </Box>
      </Modal>
    </div>
  );
};

export default Test;
