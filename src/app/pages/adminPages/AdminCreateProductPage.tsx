import { Box, Tab, Tabs, Typography } from "@mui/material";
import { CreateProductDetailsSection } from "./adminPageSections/CreateProductDetailsSection";
import { useState } from "react";
import { CreateProductImagesSection } from "./adminPageSections/CreateProductImagesSection";
import { AdminCreateProductPreviewSection } from "./adminPageSections/AdminCreateProductPreviewSection";

const AdminCreateProductPage = () => {
  const [value, setValue] = useState(0);

  const nextTab = () => {
    setValue((current) => current + 1);
  };
  const prevTab = () => {
    setValue((current) => current - 1);
  };

  return (
    <Box sx={{ padding: 4, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Create Product
        </Typography>
      </Box>
      <Tabs value={value}>
        <Tab label="Product Details" {...a11yProps(0)} />
        <Tab label="Product Images" {...a11yProps(1)} />
        <Tab label="Confirmation" {...a11yProps(2)} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <CreateProductDetailsSection nextTab={nextTab} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CreateProductImagesSection nextTab={nextTab} prevTab={prevTab} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <AdminCreateProductPreviewSection prevTab={prevTab} />
      </CustomTabPanel>
    </Box>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
export default AdminCreateProductPage;
