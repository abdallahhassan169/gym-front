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
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
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
  const barcodeRef = React.useRef();
  console.log(user_id, "user_id");
  const downloadBarcode = async () => {
    if (barcodeRef.current) {
      const canvas = await html2canvas(barcodeRef.current);
      const imageUrl = canvas.toDataURL("image/png");

      // Create a temporary anchor element to trigger the download
      const a = document.createElement("a");
      a.href = imageUrl;
      a.download = data[0]?.name + "-barcode.png";
      a.click();
    }
  };
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
  console.log(data[0]);
  return (
    <>
      {user_id?.id && (
        <div style={{ display: "flex", marginTop: "30px" }}>
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

          <div ref={barcodeRef} onDoubleClick={downloadBarcode}>
            <Barcode value={data[0]?.qr_code_name} />
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
              <li class="list-group-item"> {" حصص " + data[0]?.classes_num}</li>
            </ul>
          </div>
        </div>
      )}

      <Stack sx={{ width: "100%" }} spacing={2}>
        {user_id?.id && user_id?.exist === false && (
          <Alert severity="error">
            <AlertTitle>عملية غير ناجحة</AlertTitle>
            هذاالمستخدم غير مشترك او قد تم انتهاء اشتراكه
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
