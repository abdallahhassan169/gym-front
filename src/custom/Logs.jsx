import React from "react";
import Grid from "./Grid";
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
  const [date, setDate] = React.useState(d.toDateString());
  console.log(d);
  const url = `http://127.0.0.1:3012/users_log?query=${query}&date=${date}
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
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            marginRight: "20px",
          }}
          htmlFor="to"
        >
          التاريخ
        </label>
        <input
          onChange={(e) => {
            setDate(e.target.value);
            console.log(e.target.value);
          }}
          type="date"
        />
      </div>
      <Grid
        columns={columns}
        url={url}
        ref={gridref}
        fetchParams={[query, date]}
      />
    </>
  );
}
