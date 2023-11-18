import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "../../../Components/CustomAlert";
import { Button, FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import { backEnd } from "../../../default";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function Consumption({ onClose, productPrice }) {
  const [qty, setQty] = useState(0);

  const [noti, setNoti] = useState(false);
  console.log(productPrice, "productPrice");
  const handle = (e) => {
    e.preventDefault();
    const payload = {
      qty: qty,
      product_id: productPrice?.id,
      unit_price: productPrice?.price,
    };
    axios
      .post(backEnd + "/add_product_transaction", payload)
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
