import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Onest Variable",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#910D0D",
    },
    secondary: {
      main: "#834620",
    },
    background: {
      default: "#1F0808",
      paper: "#1F0808",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography
        variant={"h1"}
        sx={{ fontWeight: 900, fontVariantCaps: "all-small-caps" }}
      >
        Hello there
      </Typography>
      <Button variant="contained">Hello there</Button>
    </ThemeProvider>
  );
}

export default App;
