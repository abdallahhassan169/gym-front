import React from "react";
import Grid from "../../../Components/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { backEnd } from "../../../default";

const columns = [
  { field: "id", headerName: "ID", width: 90 },

  {
    field: "cost_sum",
    headerName: "المصروفات",
    width: 150,
  },
  {
    field: "sub_sum",
    headerName: "الارباح",
    width: 150,
  },

  {
    field: "date",
    headerName: "التاريخ",
    width: 250,
    valueFormatter: (params) =>
      dayjs(params.value).format("DD/MM/YYYY hh:mm A"),
  },
  {
    field: "total",
    headerName: "صافي الربح",
    width: 150,
  },
];
export default function TransactionReports() {
  const gridref = React.useRef();
  const password = "1234";
  const [type, setType] = React.useState("day");
  const [pass, setPass] = React.useState("1234");
  const [from, setFrom] = React.useState("01-01-01 00:00:00");
  const [to, setTo] = React.useState("01-01-2100 00:00:00");
  const [show, setShow] = React.useState(false);

  const types = [
    { type: "day", title: "يومي" },
    { type: "week", title: "اسبوعي" },
    { type: "month", title: "شهري" },
    { type: "year", title: "سنوي" },
  ];

  const url = `${backEnd}/reports?type=${type}&from=${from}&to=${to}
  `;
  const handle = () => {
    if (password === pass) setShow(true);
  };
  return (
    <>
      {!show && (
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
      )}
      {show && (
        <div style={{ marginRight: "5%", marginLeft: "5%" }}>
          <div
            style={{
              display: "flex",
              flex: "3",
              marginTop: "20px",
              justifyContent: "center",
            }}
          >
            <FormControl>
              <InputLabel id="demo-simple-select-helper-label">
                نوع التقرير
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="نوع التقرير"
                onChange={(e) => setType(e.target.value)}
                sx={{
                  direction: "ltr",
                  width: "200px",
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
              >
                {types.map((el) => (
                  <MenuItem value={el.type}>{el.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker"]}
              sx={{ marginRight: "10px" }}
            >
              <DatePicker
                onChange={(e) => setFrom(e.$d)}
                label="من "
                sx={{ direction: "ltr", width: "200px" }}
                format="YYYY-MM-DD"
              />
            </DemoContainer>
          </LocalizationProvider> */}
            <label
              htmlFor="from"
              style={{
                marginTop: "10px",
                marginLeft: "10px",
                marginRight: "20px",
              }}
            >
              من
            </label>
            <input onChange={(e) => setFrom(e.target.value)} type="date" />

            <label
              style={{
                marginTop: "10px",
                marginLeft: "10px",
                marginRight: "20px",
              }}
              htmlFor="to"
            >
              الي
            </label>
            <input onChange={(e) => setTo(e.target.value)} type="date" />
          </div>
          <Grid
            columns={columns}
            url={url}
            ref={gridref}
            fetchParams={[type, from, to]}
          />
        </div>
      )}
    </>
  );
}
