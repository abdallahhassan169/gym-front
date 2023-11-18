import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "../../Components/CustomAlert";
import { Button, FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";

import axios from "axios";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function NewProduct({ onClose, data }) {
  const [name, setName] = useState();
  const [serial, setSerial] = useState();
  const [qty, setQty] = useState();
  const [price, setPrice] = useState();

  const [noti, setNoti] = useState(false);

  const handle = (e) => {
    e.preventDefault();
    const payload = {
      name: name ?? data.name,
      serial: serial ?? data.serial,
      qty: qty ?? data?.availble,
      price: price ?? data.price,
      id: data?.id,
    };
    console.log(payload);
    axios
      .post("http://127.0.0.1:3012/add_product", payload)
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
        <InputLabel htmlFor="my-input">الاسم </InputLabel>
        <OutlinedInput
          type="text"
          required
          id="my-input"
          aria-describedby="my-helper-text"
          variant="standard"
          defaultValue={data?.name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ marginTop: "20px" }}>
        <InputLabel htmlFor="my-input">السريال </InputLabel>
        <OutlinedInput
          type="text"
          id="my-input"
          aria-describedby="my-helper-text"
          variant="standard"
          defaultValue={data?.serial}
          onChange={(e) => setSerial(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ marginTop: "20px" }}>
        <InputLabel htmlFor="my-input">الكمية </InputLabel>
        <OutlinedInput
          type="number"
          required
          defaultValue={data?.availble}
          id="my-input"
          aria-describedby="my-helper-text"
          variant="standard"
          onChange={(e) => setQty(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ marginTop: "20px" }}>
        <InputLabel htmlFor="my-input">السعر </InputLabel>
        <OutlinedInput
          type="number"
          required
          id="my-input"
          aria-describedby="my-helper-text"
          variant="standard"
          defaultValue={data?.price}
          onChange={(e) => setPrice(e.target.value)}
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
