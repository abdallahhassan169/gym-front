import React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AllProducts from "./AllProducts";
import ProductsPrices from "./ProductPrices";
import ProductsForConsumption from "./ProductsForConsumption";
import { Box } from "@mui/material";
import ProductReports from "./ProductReports";
import Transactions from "./Transactions";
export default function Index({ isAdmin }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <TabContext value={value} sx={{ textColor: "red" }}>
      <Box
        sx={{
          borderBottom: "0px",
          direction: "rtl",

          width: "100%",
        }}
      >
        <TabList
          sx={{
            height: "40px",
            marginTop: "15px",
            paddingBottom: "0px",
            color: "white",
            textColor: "white",
          }}
          onChange={handleChange}
          aria-label="lab API tabs example"
        >
          <Tab label=" الاستهلاك " value="1" />
          <Tab label=" المنتجات " value="2" disabled={!isAdmin} />
          <Tab label=" الشحنات " value="3" disabled={!isAdmin} />
          <Tab label=" تقارير البوفيه " value="4" disabled={!isAdmin} />
          <Tab label=" عمليات الشراء  " value="5" disabled={!isAdmin} />
        </TabList>
      </Box>

      <TabPanel value="1">
        <ProductsForConsumption />
      </TabPanel>
      <TabPanel value="2">
        <AllProducts />
      </TabPanel>
      <TabPanel value="3">
        <ProductsPrices />
      </TabPanel>
      <TabPanel value="4">
        <ProductReports />
      </TabPanel>
      <TabPanel value="5">
        <Transactions />
      </TabPanel>
    </TabContext>
  );
}
