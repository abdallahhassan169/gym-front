import React from "react";
import Grid from "../../../Components/Grid";
import { Alert } from "../../../Components/CustomAlert";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import NewProduct from "./NewProduct";
import NewProductShipment from "../Shipments/NewProductShipment";
import { backEnd } from "../../../default";
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "الاسم",
    width: 150,
  },
  {
    field: "serial",
    headerName: "السريال",
    width: 150,
    valueFormatter: (params) => params.value || "NAN",
  },
  {
    field: "availble",
    headerName: "المتاح",
    width: 200,
    valueFormatter: (params) => params.value || 0,
  },
  {
    field: "price",
    headerName: "السعر",
    width: 200,
    valueFormatter: (params) => params.value || 0,
  },
];
export default function AllProducts() {
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
  const url = `${backEnd}/products?query=${query}
  `;
  return (
    <>
      <Button
        variant="contained"
        style={{ width: "100%", height: "40px", marginBottom: "10px" }}
        color="success"
        onClick={() => setModal("AddProduct")}
      >
        اضافة منتج جديد
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
          {modal === "AddProduct" ? (
            <NewProduct onClose={onAddClose} />
          ) : (
            <NewProductShipment productId={productId} onClose={onAddClose} />
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
