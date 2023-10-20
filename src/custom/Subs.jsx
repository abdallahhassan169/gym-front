import React from "react";
import Grid from "./Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import CostForm from "./CostForm";
import CostCard from "./CostCard";
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
    headerName: "التكلفة",
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
  const [modal, setModal] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const onRowClick = () => {
    setModal("info");
    console.log("lllll");
  };
  const onAddClose = (refresh) => {
    if (refresh) {
      setModal(false);
      gridref.current.refreshData();
    } else setModal(false);
  };
  const url = `http://127.0.0.1:3012/subs_costs?type=${parseInt(
    2
  )}&query=${query}`;
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
      <Grid
        columns={columns}
        url={url}
        ref={gridref}
        rowClick={onRowClick}
        fetchParams={[query]}
      />
      <Modal
        open={modal}
        onClose={() => onAddClose(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{modal === "info" ? <CostCard /> : <CostForm />}</Box>
      </Modal>
    </>
  );
}
