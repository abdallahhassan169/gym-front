import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import Snackbar from "@mui/material/Snackbar";
import Grid from "../../../Components/Grid";
import { Alert } from "../../../Components/CustomAlert";
import NewProductPrice from "./NewProductShipment";
import { backEnd } from "../../../default";
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "اسم المنتج",
    width: 150,
  },

  {
    field: "total_price",
    headerName: "سعر الشحنة ",
    width: 200,
  },

  {
    field: "qty",
    headerName: "كمية الشحنة ",
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
export default function ProductsPrices() {
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
  const [current, setCurrent] = React.useState();
  const [noti, setNoti] = React.useState(false);

  const onAddClose = (refresh) => {
    if (refresh) {
      setModal(false);
      gridref.current.refreshData();
      setNoti("تمت الاضافة بنجاح");
    } else setModal(false);
  };
  const url = `${backEnd}/product_prices?query=${query}`;
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
      <Modal
        open={modal}
        onClose={() => onAddClose(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <NewProductPrice init={current} onClose={onAddClose} />
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
