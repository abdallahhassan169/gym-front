import axios from "axios";
import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import NewReg from "./NewReg";
import { Button } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { backEnd } from "../../default";

export default function UserCard({ user_id }) {
  console.log(user_id?.id);
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
  const my = React.useRef();
  console.log(user_id, "user_id");

  const onClose = () => {
    setModalShow(false);
    fetch();
    setNoti("تم الاشتراك بنجاح");
  };
  const url = backEnd + "/user_by_id?user_id=" + parseInt(user_id?.id);
  const fetch = () => {
    axios
      .get(url)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    fetch();
  }, [user_id?.id]);
  return (
    <>
      {user_id?.id && (
        <div style={{ display: "inline-flex", marginTop: "30px" }}>
          <div
            class="card"
            style={{
              width: "80%",
              width: "150px",
              height: "150px",
              marginRight: "5px",
              marginLeft: "5px",
            }}
          >
            <img
              class="card-img-top"
              src={"http://127.0.0.1:3012/user_img?id=" + parseInt(user_id?.id)}
              alt="  لا يوجد صورة شخصية"
            ></img>
          </div>
          <div
            class="card"
            style={{ width: "80%", width: "150px", height: "150px" }}
          >
            <img
              class="card-img-top"
              src={"http://127.0.0.1:3012/img?id=" + parseInt(user_id?.id)}
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
              <li class="list-group-item">
                {data[0]?.reg_end_date?.slice(0, 10) ?? "غير مشترك"}
              </li>
              <li class="list-group-item">{" حصص " + data[0]?.classes_num}</li>

              <li class="list-group-item"></li>
            </ul>
          </div>
        </div>
      )}

      <Stack sx={{ width: "100%" }} spacing={2}>
        {(user_id?.id & user_id?.exist) === false && (
          <Alert severity="error">
            <AlertTitle>تنبيه</AlertTitle>
            لقد تم انتهاء الاشتراك
          </Alert>
        )}
        {!user_id?.id && (
          <Alert severity="info">
            <AlertTitle>رسالة</AlertTitle>
            هذا المستخدم غير موجود
          </Alert>
        )}
        {user_id?.exist === true && (
          <Alert severity="success">
            <AlertTitle>عملية ناجحة</AlertTitle>
            تم التسجيل بنجاح
          </Alert>
        )}
      </Stack>

      {user_id?.id && (
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            marginTop: "20px",
          }}
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
      )}
      <Modal
        open={modalShow}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <NewReg user_id={user_id?.id} onClose={onClose} />
        </Box>
      </Modal>
    </>
  );
}
