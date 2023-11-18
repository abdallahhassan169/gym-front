import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "../../../Components/CustomAlert";
import { Button, FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { backEnd } from "../../../default";

export default function NewProductShipment({ onClose, productId, init }) {
  const [qty, setQty] = useState(init?.qty);
  const [price, setPrice] = useState(init?.unit_price);
  const [total, setTotal] = useState(init?.unit_price);

  const [noti, setNoti] = useState(false);

  const handle = (e) => {
    e.preventDefault();
    const payload = {
      qty: qty,
      unit_price: price,
      total_price: total,
      product_id: productId,
      id: init?.id,
    };
    axios
      .post(backEnd + "/add_shipment", payload)
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
          defaultValue={init?.qty}
          onChange={(e) => setQty(e.target.value)}
        />
      </FormControl>

      <FormControl sx={{ marginTop: "20px" }}>
        <InputLabel htmlFor="my-input">سعر الشراء الكلي </InputLabel>
        <OutlinedInput
          type="number"
          required
          id="my-input"
          aria-describedby="my-helper-text"
          variant="standard"
          defaultValue={init?.total_price}
          onChange={(e) => setTotal(e.target.value)}
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
