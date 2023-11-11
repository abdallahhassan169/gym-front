import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Button, FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";

import axios from "axios";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function Consumption({ onClose, productPriceId }) {
  const [qty, setQty] = useState(0);

  const [noti, setNoti] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handle = (e) => {
    e.preventDefault();
    const payload = {
      qty: qty,
      product_price_id: productPriceId,
    };
    axios
      .post("http://127.0.0.1:3012/add_product_transaction", payload)
      .then((res) => {
        console.log(res);
        onClose(true);
      })
      .catch((err) => setNoti("خطا في الاضافة"));
    console.log(payload);
  };
  return (
    <FormControl sx={{ width: "100%" }}>
      <FormControl sx={{ marginTop: "20px" }}>
        <InputLabel htmlFor="my-input">الكمية </InputLabel>
        <OutlinedInput
          type="number"
          required
          id="my-input"
          aria-describedby="my-helper-text"
          variant="standard"
          onChange={(e) => setQty(e.target.value)}
        />
      </FormControl>

      <FormControl sx={{ marginTop: "20px" }}>
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ marginY: "8px" }}
          onClick={handle}
        >
          اضافة
        </Button>
      </FormControl>
      <Snackbar
        open={noti}
        autoHideDuration={6000}
        onClose={() => setNoti(false)}
      >
        <Alert
          onClose={() => setNoti(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {noti}
        </Alert>
      </Snackbar>
    </FormControl>
  );
}
