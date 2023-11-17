import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Box from "@mui/material/Box";

const Grid = React.forwardRef(
  ({ columns, url, fetchParams, rowClick }, ref, props) => {
    const [data, setData] = React.useState([]);
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
        <Box
          sx={{
            height: 550,
            width: "100%",
            marginTop: "15px",
            bgcolor: "grey",
            color: "white",
            border: 2,
            borderColor: "primary.light",
            marginBottom: "90px",
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#556B2F",
            },
          }}
        >
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
      </>
    );
  }
);
export default Grid;
