import { Outlet } from "react-router";
import { Box } from "@mui/material";
import { ThemeProvider } from "./app/components/shadcn-theme-provider";

const Root = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Box>
          <Outlet />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Root;
