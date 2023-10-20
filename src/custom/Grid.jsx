import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import UserCard from "./UserCard";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const Grid = React.forwardRef(
  ({ columns, url, fetchParams, rowClick }, ref, props) => {
    const [data, setData] = React.useState([]);
    const [user, setUser] = React.useState(null);
    console.log(fetchParams, "fetchParams");
    const fetchUsers = () => {
      axios.get(url).then((res) => {
        setData(res.data);
        console.log(res.data, "dataaa");
      });
      console.log("fetching");
    };

    React.useEffect(() => {
      fetchUsers();
    }, fetchParams ?? []);

    React.useImperativeHandle(ref, () => ({
      refreshData() {
        fetchUsers();
      },
    }));

    return (
      <>
        <div>
          <Box sx={{ height: 550, width: "100%", marginTop: "15px" }}>
            <DataGrid
              onRowClick={rowClick}
              rows={data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
              {...props}
            />
          </Box>
        </div>
      </>
    );
  }
);
export default Grid;
