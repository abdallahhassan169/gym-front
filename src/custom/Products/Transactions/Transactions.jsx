import React from "react";
import Grid from "../../../Components/Grid";
import dayjs from "dayjs";
import { backEnd } from "../../../default";

const columns = [
  { field: "id", headerName: "ID", width: 90 },

  {
    field: "total_price",
    headerName: "السعر",
    width: 150,
  },
  {
    field: "name",
    headerName: "اسم المنتج",
    width: 200,
  },
  {
    field: "qty",
    headerName: "الكمية ",
    width: 100,
  },
  {
    field: "date",
    headerName: "التاريخ",
    width: 200,
    valueFormatter: (params) =>
      dayjs(params.value).format("DD/MM/YYYY hh:mm A"),
  },
];
export default function Transactions() {
  const gridref = React.useRef();
  const [from, setFrom] = React.useState("01-01-01 00:00:00");
  const [to, setTo] = React.useState("01-01-2100 00:00:00");
  const [show, setShow] = React.useState(false);

  const url = `${backEnd}/product_transactions?from=${from}&to=${to}
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
          fetchParams={[from, to]}
        />
      </div>
    </>
  );
}
