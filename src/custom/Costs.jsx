import React from "react";
import Grid from "../Components/Grid";
import { Alert } from "../Components/CustomAlert";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import CostForm from "./CostForm";
import CostCard from "./CostCard";
import dayjs from "dayjs";
import Snackbar from "@mui/material/Snackbar";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "description",
    headerName: "الوصف",
    width: 300,
  },
  {
    field: "cost",
    headerName: "التكلفة",
    width: 150,
  },
  {
    field: "date",
    headerName: "التاريخ",
    width: 300,
    valueFormatter: (params) =>
      dayjs(params.value).format("DD/MM/YYYY hh:mm A"),
  },
];
export default function Costs({ type }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const gridref = React.useRef();
  const [modal, setModal] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [billId, setBillId] = React.useState();
  const [noti, setNoti] = React.useState(false);

  const onRowClick = (row) => {
    setModal("info");
    setBillId(row?.row.id);
  };
  const onAddClose = (refresh) => {
    if (refresh) {
      setModal(false);
      gridref.current.refreshData();
      setNoti("تمت الاضافة بنجاح");
    } else setModal(false);
  };
  const url = `http://127.0.0.1:3012/subs_costs?type=${parseInt(
    type
  )}&query=${query}
  `;
  return (
    <>
      <Button
        variant="contained"
        style={{ width: "100%", height: "40px", marginBottom: "10px" }}
        color="success"
        onClick={() => setModal("AddCost")}
      >
        اضافة مصروفات
      </Button>
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
        <Box sx={style}>
          {modal === "info" ? (
            <CostCard bill={billId} />
          ) : (
            <CostForm type={type} onClose={onAddClose} />
          )}
        </Box>
      </Modal>
      <Snackbar
        open={noti}
        autoHideDuration={6000}
        onClose={() => setNoti(false)}
      >
        <Alert
          onClose={() => setNoti(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {noti}
        </Alert>
      </Snackbar>
    </>
  );
}
