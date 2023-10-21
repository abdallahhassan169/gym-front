import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import { Button, FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import axios from "axios";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function NewReg({ user_id, onClose }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [num, setNum] = useState(0);
  const [cost, setCost] = useState(0);
  const [noti, setNoti] = useState("");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handle = (props) => {
    const payload = {
      id: user_id,
      reg_start_date: from,
      cost: cost,
      reg_end_date: to,
      classes_num: num,
    };
    axios
      .post("http://127.0.0.1:3012/add_reg", payload)
      .then((res) => {
        res.status === 200 ? setNoti("success") : setNoti("error");
      })
      .then((res) => onClose(true))
      .catch((err) => setNoti("خطا في الاضافة"));
    console.log(payload);
  };
  return (
    <>
      <FormControl sx={{ direction: "ltr" }}>
        <FormControl>
          <InputLabel htmlFor="my-input">عدد الحصص</InputLabel>
          <OutlinedInput
            type="number"
            required
            id="my-input"
            aria-describedby="my-helper-text"
            variant="standard"
            onChange={(e) => setNum(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ marginTop: "10px" }}>
          <InputLabel htmlFor="my-input">السعر </InputLabel>
          <OutlinedInput
            type="number"
            required
            id="my-input"
            aria-describedby="my-helper-text"
            variant="standard"
            onChange={(e) => setCost(e.target.value)}
          />
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker onChange={(e) => setFrom(e.$d)} required label="من" />
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker required label="الي" onChange={(e) => setTo(e.$d)} />
          </DemoContainer>
        </LocalizationProvider>
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ marginY: "8px" }}
          onClick={handle}
        >
          تسجيل
        </Button>
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
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
    </>
  );
}
