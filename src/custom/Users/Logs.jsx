import React from "react";
import Grid from "../../Components/Grid";
import dayjs from "dayjs";
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "الاسم",
    width: 300,
  },
  {
    field: "phone",
    headerName: "التليفون",
    width: 200,
  },
  {
    field: "time",
    headerName: "التاريخ",
    width: 200,
    valueFormatter: (params) =>
      dayjs(params.value).format("DD/MM/YYYY hh:mm A"),
  },
];
export default function Logs() {
  const gridref = React.useRef();
  const d = new Date();
  const [query, setQuery] = React.useState("");
  console.log(d);
  const [from, setFrom] = React.useState("01-01-01 00:00:00");
  const [to, setTo] = React.useState("01-01-2100 00:00:00");
  const url = `http://127.0.0.1:3012/users_log?query=${query}&from=${from}&to=${to}
  `;
  return (
    <>
      <div style={{ width: "93%" }}>
        <input
          sport="search"
          class="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={(e) => setQuery(e.target.value)}
        />
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
        fetchParams={[query, from, to]}
      />
    </>
  );
}
