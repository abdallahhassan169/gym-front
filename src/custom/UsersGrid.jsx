import Grid from "./Grid";
import React from "react";
import UserCard from "./UserCard";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "الاسم",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "type_name",
    headerName: "نوع المستخدم",
    width: 150,
  },
  {
    field: "phone",
    headerName: "التليفون",
    width: 110,
  },
  {
    field: "email",
    headerName: "الايميل",
    sortable: false,
    width: 150,
  },
  {
    field: "sport_name",
    headerName: "الرياضة",
    sortable: false,
    width: 100,
  },
  {
    field: "classes_num",
    headerName: "التمرينات",
    sortable: false,
    width: 100,
  },
];

const UsersGrid = React.forwardRef(({ query, sport }, ref) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [modalShow, setModalShow] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const gridref = React.useRef();
  const refreshGrid = () => {
    gridref.current.refreshData();
  };
  console.log(gridref);
  React.useImperativeHandle(ref, () => ({
    refreshGrid() {
      refreshGrid();
    },
  }));
  const rowClick = (props) => {
    setModalShow(true);
    setUser(props.row.id);
  };
  const url = `http://127.0.0.1:3012/users?query=${query}&sport=${
    parseInt(sport) ? parseInt(sport) : 1
  }`;

  return (
    <>
      <Grid
        columns={columns}
        url={url}
        fetchParams={[sport, query]}
        rowClick={rowClick}
        ref={gridref}
      />
      <Modal
        open={modalShow}
        onClose={() => setModalShow(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UserCard user_id={{ id: user }} />
        </Box>
      </Modal>
    </>
  );
});
export default UsersGrid;
