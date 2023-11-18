import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "../Components/CustomAlert";
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
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import NewUser from "./Users/NewUser";
import UsersGrid from "./Users/UsersGrid";
import Costs from "./Costs/Costs";
import Subs from "./Users/Subscriptions";
import Reports from "./Reports/Reports";
import Index from "./Products/Index";
import Logs from "./Users/Logs";
import AdminForm from "./Admin/AdminForm";
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
  const [isAdmin, setIsAdmin] = React.useState(false);
  const handleAdmin = () => {
    setIsAdmin(true);
    setUserModal(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [data, setData] = React.useState([]);
  const [sport, setSport] = React.useState(0);
  const [query, setQuery] = React.useState("");
  const [userModal, setUserModal] = React.useState(false);
  const [noti, setNoti] = React.useState(false);
  const gridref = React.useRef();

  const onUserFormClose = (refresh) => {
    if (refresh) {
      setUserModal(false);
      gridref?.current?.refreshGrid();
      setNoti("تمت الاضافة بنجاح");
      console.log(" doneeee");
    } else {
      setUserModal(false);
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
          <TabContext
            value={value}
            sx={{
              textColor: "red",
              borderRadius: "10px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                borderBottom: "0px",
                direction: "rtl",
                borderRadius: "10px",
                textColor: "red",
                width: "100%",
              }}
            >
              <TabList
                sx={{
                  backgroundColor: "#333",
                  height: "60px",
                  borderRadius: "15px",
                  paddingBottom: "0px",
                  color: "white",
                  textColor: "white",
                  alignItems: "center",
                }}
                centered
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="الاشتراكات" value="1" sx={{ color: "white" }} />

                <Tab
                  label="المصاريف "
                  value="2"
                  sx={{ color: "white" }}
                  disabled={!isAdmin}
                />
                <Tab
                  label=" دخل الاشتراكات "
                  value="3"
                  sx={{ color: "white" }}
                  disabled={!isAdmin}
                />
                <Tab
                  label=" التقارير "
                  value="4"
                  sx={{ color: "white" }}
                  disabled={!isAdmin}
                />
                <Tab label=" البوفيه " value="5" sx={{ color: "white" }} />
                <Tab
                  label=" الاجهزة "
                  value="6"
                  sx={{ color: "white" }}
                  disabled={!isAdmin}
                />
                <Tab
                  label=" الحضور "
                  value="7"
                  sx={{ color: "white" }}
                  disabled={!isAdmin}
                />
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
              <Costs type={1} />
            </TabPanel>
            <TabPanel value="3">
              <Subs />
            </TabPanel>

            <TabPanel value="4">
              <Reports />
            </TabPanel>
            <TabPanel value="5">
              <Index isAdmin={isAdmin} />
            </TabPanel>
            <TabPanel value="6">
              <Costs type={3} />
            </TabPanel>
            <TabPanel value="7">
              <Logs />
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
            <div style={{ backgroundColor: "grey", marginTop: "5px" }}>
              <CDBSidebarMenu onClick={() => setUserModal("admin")}>
                <CDBSidebarMenuItem icon="key">Admin</CDBSidebarMenuItem>
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
          {userModal === "admin" ? (
            <AdminForm onSuccess={handleAdmin} />
          ) : (
            <NewUser onClose={onUserFormClose} />
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
