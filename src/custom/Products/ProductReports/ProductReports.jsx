import React from "react";
import Grid from "../../../Components/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { backEnd } from "../../../default";
import dayjs from "dayjs";

const columns = [
  { field: "id", headerName: "ID", width: 90 },

  {
    field: "profit",
    headerName: "الارباح",
    width: 150,
  },
  {
    field: "cost",
    headerName: "التكاليف",
    width: 150,
  },
  {
    field: "total",
    headerName: "المجموع",
    width: 150,
  },
  {
    field: "date",
    headerName: "التاريخ",
    width: 200,
    valueFormatter: (params) =>
      dayjs(params.value).format("DD/MM/YYYY hh:mm A"),
  },
];
export default function ProductReports() {
  const [type, setType] = React.useState("day");
  const [from, setFrom] = React.useState("01-01-01 00:00:00");
  const [to, setTo] = React.useState("01-01-2100 00:00:00");
  const gridref = React.useRef();

  const types = [
    { type: "day", title: "يومي" },
    { type: "week", title: "اسبوعي" },
    { type: "month", title: "شهري" },
    { type: "year", title: "سنوي" },
  ];

  const url = `${backEnd}/product_reports?type=${type}&from=${from}&to=${to}
  `;

  return (
    <>
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
                bgcolor: "#faf5f5",
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
    </>
  );
}
