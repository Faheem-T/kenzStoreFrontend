import { Box } from "@mui/material";
import { ReactNode, Suspense } from "react";
import { SkewLoader } from "react-spinners";

export const WrapinSuspense = (component: ReactNode) => {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <SkewLoader />
        </Box>
      }
    >
      {component}
    </Suspense>
  );
};
