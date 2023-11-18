import React from "react";
import Grid from "../../Components/Grid";
import { backEnd } from "../../default";

import dayjs from "dayjs";
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "client_name",
    headerName: "الاسم",
    width: 250,
  },
  {
    field: "cost",
    headerName: "سعر الاشتراك",
    width: 250,
  },
  {
    field: "date",
    headerName: "التاريخ",
    width: 300,
    valueFormatter: (params) =>
      dayjs(params.value).format("DD/MM/YYYY hh:mm A"),
  },
];
export default function Subs() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 650,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const gridref = React.useRef();
  const [query, setQuery] = React.useState("");

  const url = `${backEnd}/subs_costs?type=${parseInt(2)}&query=${query}`;
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
      </div>
      <Grid columns={columns} url={url} ref={gridref} fetchParams={[query]} />
    </>
  );
}
