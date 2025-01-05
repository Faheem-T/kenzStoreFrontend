import { Box, CircularProgress } from "@mui/material"

interface LoadingComponentTypes {
    fullScreen?: boolean
}

export const LoadingComponent = ({ fullScreen }: LoadingComponentTypes) => {
    const height = fullScreen ? "100vh" : "100%"
    return (
        <Box sx={{ height, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress size="4rem" />
        </Box>
    )
}
