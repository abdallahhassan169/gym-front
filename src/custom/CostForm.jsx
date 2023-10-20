import React from "react";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import { Button, FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import axios from "axios";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function CostForm() {
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0);
  const [file, setFile] = useState();

  const [noti, setNoti] = useState("");
  console.log(noti);
  const handle = async (props) => {
    const payload = {
      cost: cost,
      description: description,
    };
    const formData = new FormData();
    formData.append("image", file);
    formData.append("data", JSON.stringify(payload));

    await axios.post("http://localhost:3012/add_cost", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  return (
    <FormControl sx={{ direction: "ltr" }}>
      <FormControl>
        <InputLabel htmlFor="my-input">الوصف</InputLabel>
        <OutlinedInput
          type="text"
          required
          id="my-input"
          aria-describedby="my-helper-text"
          variant="standard"
          onChange={(e) => setDescription(e.target.value)}
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
  );
}
