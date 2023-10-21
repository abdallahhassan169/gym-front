import axios from "axios";
import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import NewReg from "./NewReg";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
export default function UserCard({ user_id }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    height: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [data, setData] = React.useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [noti, setNoti] = React.useState("");
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const onClose = (refresh) => {
    if (refresh) {
      setModalShow(false);
      fetch();
      setNoti("تم الاشتراك بنجاح");
    } else setModalShow(false);
  };
  const fetch = () => {
    axios
      .get("http://127.0.0.1:3012/user_by_id?user_id=" + parseInt(user_id))
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    fetch();
  }, [user_id]);
  return (
    <>
      <div style={{ display: "inline-flex", marginTop: "30px" }}>
        <div class="card" style={{ width: "80%", width: "300px" }}>
          <img
            class="card-img-top"
            src={"http://127.0.0.1:3012/img?id=" + parseInt(user_id)}
            alt="Card image cap"
          ></img>
        </div>
        <div
          class="card"
          style={{
            marginLeft: "20px",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            width: "400px",
          }}
        >
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <h3>المعلومات الاساسية </h3>
            </li>
            <li class="list-group-item">{data[0]?.name}</li>
            <li class="list-group-item">{data[0]?.phone}</li>
            <li class="list-group-item">{data[0]?.email}</li>
            <li class="list-group-item">{data[0]?.birth_day.slice(0, 10)}</li>
            <li class="list-group-item">{" حصص " + data[0]?.classes_num}</li>

            <li class="list-group-item"></li>
          </ul>
        </div>
      </div>
      <div
        style={{ justifyContent: "center", display: "flex", marginTop: "20px" }}
      >
        <Button
          color="success"
          onClick={() => setModalShow(true)}
          variant="contained"
          sx={{ width: "700px", height: "50px", color: "black" }}
        >
          تحديث معلومات الاشتراك
        </Button>
      </div>
      <Modal
        open={modalShow}
        onClose={() => setModalShow(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <NewReg user_id={user_id} onClose={onClose} />
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
