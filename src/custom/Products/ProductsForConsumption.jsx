import React from "react";
import Grid from "../Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import NewProduct from "./NewProduct";
import NewProductPrice from "./NewProductPrice";
import Consumption from "./Consumption";
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "الاسم",
    width: 300,
  },
  {
    field: "unit_price",
    headerName: "السعر",
    width: 300,
  },
];
export default function ProductsForConsumption() {
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
  const [productId, setProductId] = React.useState();
  const [noti, setNoti] = React.useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const onRowClick = (row) => {
    setModal("addPrice");
    setProductId(row?.row.id);
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
          <Consumption productPriceId={productId} onClose={onAddClose} />
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
