import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import Grid from "./Grid";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import NewUser from "./NewUser";
import UsersGrid from "./UsersGrid";
import Costs from "./Costs";
import Subs from "./Subs";
import Reports from "./Reports";
export default function Main() {
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
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [data, setData] = React.useState([]);
  const [sport, setSport] = React.useState(0);
  const [query, setQuery] = React.useState("");
  const [userModal, setUserModal] = React.useState(false);
  const [noti, setNoti] = React.useState(false);
  const gridref = React.useRef();
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  console.log(gridref, "gridref");
  const onUserFormClose = (refresh) => {
    if (refresh) {
      setUserModal(false);
      gridref.current.refreshGrid();
      setNoti("تمت الاضافة بنجاح");
      console.log(" doneeee");
    } else {
      setUserModal(false);
      gridref.current.refreshGrid();
    }
  };
  const getData = () => {
    axios
      .get("http://127.0.0.1:3012/sports")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          height: "110vh",
          overflow: "scroll initial",
          direction: "rtl",
        }}
      >
        <div
          class="input-group rounded"
          style={{
            height: "40px",
            width: "100%",
            margin: "10px 80px 0px 80px",
          }}
        >
          <TabContext value={value} sx={{ textColor: "red" }}>
            <Box
              sx={{
                borderBottom: "0px",
                direction: "rtl",

                textColor: "red",
                width: "100%",
              }}
            >
              <TabList
                sx={{
                  backgroundColor: "#333",
                  height: "60px",

                  paddingBottom: "0px",
                  color: "white",
                  textColor: "white",
                }}
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="الاشتراكات" value="1" />
                <Tab label="المصاريف " value="2" />
                <Tab label=" دخل الاشتراكات " value="3" />
                <Tab label=" التقارير " value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
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
              <UsersGrid sport={sport} query={query} ref={gridref} />
            </TabPanel>
            <TabPanel value="2">
              <Costs />{" "}
            </TabPanel>
            <TabPanel value="3">
              <Subs />
            </TabPanel>
            <TabPanel value="4">
              <Reports />
            </TabPanel>
          </TabContext>
        </div>

        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              Gym
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            {value === "1" &&
              data?.map((el) => (
                <div
                  style={{
                    backgroundColor: el.id === sport && "	#26d926",
                  }}
                >
                  <CDBSidebarMenu onClick={() => setSport(el.id)}>
                    <CDBSidebarMenuItem icon="columns">
                      {el.name}
                    </CDBSidebarMenuItem>
                  </CDBSidebarMenu>
                </div>
              ))}
            <div style={{ backgroundColor: "grey" }}>
              <CDBSidebarMenu onClick={() => setUserModal(true)}>
                <CDBSidebarMenuItem icon="user">
                  انشاء مستخدم جديد
                </CDBSidebarMenuItem>
              </CDBSidebarMenu>
            </div>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div
              style={{
                padding: "20px 5px",
              }}
            >
              Lets Do It
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>

      <Modal
        open={userModal}
        onClose={() => onUserFormClose(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <NewUser onClose={onUserFormClose} />
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
