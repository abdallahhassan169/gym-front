import React from "react";
import Grid from "../Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import NewProductPrice from "./NewProductPrice";
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "اسم المنتج",
    width: 150,
  },
  {
    field: "unit_price",
    headerName: "سعر الوحدة",
    width: 100,
  },
  {
    field: "total_price",
    headerName: "سعر الشحنة ",
    width: 100,
  },
  {
    field: "qty",
    headerName: "الكمية المتبقية",
    width: 100,
  },
  {
    field: "total_qty",
    headerName: "كمية الشحنة ",
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
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const onRowClick = (row) => {
    setModal("info");
    setCurrent(row?.row);
  };
  const onAddClose = (refresh) => {
    if (refresh) {
      setModal(false);
      gridref.current.refreshData();
      setNoti("تمت الاضافة بنجاح");
    } else setModal(false);
  };
  const url = `http://127.0.0.1:3012/product_prices?query=${query}`;
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
