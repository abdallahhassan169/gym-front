import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button } from "@mui/material";

export default function AdminForm({ onSuccess }) {
  const [pass, setPass] = React.useState("1234");
  const password = "1234";

  const handle = () => {
    if (password === pass) onSuccess();
  };
  return (
    <div style={{ margin: "5%" }}>
      <FormControl sx={{ width: "100%" }}>
        <FormControl sx={{ marginTop: "20px" }}>
          <InputLabel htmlFor="my-input">كلمة السر </InputLabel>
          <OutlinedInput
            type="password"
            required
            id="my-input"
            aria-describedby="my-helper-text"
            variant="standard"
            onChange={(e) => setPass(e.target.value)}
          />
        </FormControl>
        <Button
          color="success"
          sx={{ marginTop: "15px" }}
          onClick={handle}
          variant="contained"
        >
          تأكيد
        </Button>
      </FormControl>
    </div>
  );
}
