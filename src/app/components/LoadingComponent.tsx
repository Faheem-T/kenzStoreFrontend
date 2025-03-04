import { Box, CircularProgress } from "@mui/material";

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
      <CircularProgress size="4rem" />
    </Box>
  );
};
export default LoadingComponent;
