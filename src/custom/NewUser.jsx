import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "../Components/CustomAlert";
import { Button, FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function NewUser({ onClose }) {
  const [file, setFile] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDay, setBirthDate] = useState("");
  const [userType, setUserType] = useState("");
  const [userSport, setUserSport] = useState("");
  const [types, setTypes] = useState([]);
  const [sports, setSports] = useState([]);
  const [noti, setNoti] = useState(false);

  console.log(noti);
  React.useEffect(() => {
    axios
      .get("http://127.0.0.1:3012/sports")
      .then((res) => setSports(res.data))
      .catch((err) => setNoti("خطا  "));
    axios
      .get("http://127.0.0.1:3012/types")
      .then((res) => setTypes(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handle = (e) => {
    e.preventDefault();
    const payload = {
      birth_day: birthDay,
      name: name,
      email: email,
      phone: phone,
      id_user_type: parseInt(userType),
      id_sport: parseInt(userSport),
    };
    const formData = new FormData();
    formData.append("image", file);
    formData.append("data", JSON.stringify(payload));
    axios
      .post("http://127.0.0.1:3012/add_user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        onClose(true);
      })
      .catch((err) => setNoti("خطا في الاضافة"));
    console.log(payload);
  };
  console.log(types);
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
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ marginTop: "20px" }}>
        <InputLabel htmlFor="my-input">الايميل </InputLabel>
        <OutlinedInput
          type="text"
          required
          id="my-input"
          aria-describedby="my-helper-text"
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ marginTop: "20px" }}>
        <InputLabel htmlFor="my-input"> التليفون</InputLabel>
        <OutlinedInput
          type="text"
          required
          id="my-input"
          aria-describedby="my-helper-text"
          variant="standard"
          onChange={(e) => setPhone(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ marginTop: "20px" }}>
        <InputLabel id="demo-simple-select-helper-label">الرياضة</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="الرياضة"
          onChange={(e) => setUserSport(e.target.value)}
          sx={{ direction: "ltr" }}
        >
          {sports.map((el) => (
            <MenuItem value={el.id}>{el.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ marginTop: "10px" }}>
        <OutlinedInput
          type="file"
          required
          id="my-input"
          aria-describedby="my-helper-text"
          variant="standard"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </FormControl>
      <FormControl sx={{ marginTop: "20px" }}>
        <InputLabel id="demo-simple-select-helper-label">
          نوع المستخدم
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="نوع المستخدم"
          onChange={(e) => setUserType(e.target.value)}
          sx={{ direction: "ltr" }}
        >
          {types.map((el) => (
            <MenuItem value={el.id}>{el.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ marginTop: "20px", width: "100%" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              onChange={(e) => setBirthDate(e.$d)}
              required
              label="تاريخ الميلاد"
            />
          </DemoContainer>
        </LocalizationProvider>
      </FormControl>

      <FormControl sx={{ marginTop: "20px" }}>
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ marginY: "8px" }}
          onClick={handle}
        >
          تسجيل
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
