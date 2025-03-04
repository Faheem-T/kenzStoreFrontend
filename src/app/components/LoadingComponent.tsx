import { Box } from "@mui/material";
import { SkewLoader } from "react-spinners";

interface LoadingComponentTypes {
  fullScreen?: boolean;
}

const LoadingComponent = ({ fullScreen }: LoadingComponentTypes) => {
  const height = fullScreen ? "100vh" : "100%";
  const width = fullScreen ? "100vw" : "100%";
  return (
    <Box
      sx={{
        height,
        width,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SkewLoader />
    </Box>
  );
};
export default LoadingComponent;
