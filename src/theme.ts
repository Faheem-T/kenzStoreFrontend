import { createTheme, responsiveFontSizes } from "@mui/material";
declare module "@mui/material/styles" {
  interface Palette {
    buttonBlue?: Palette["primary"];
    accent: Palette["primary"];
  }
  interface PaletteOptions {
    buttonBlue?: PaletteOptions["primary"];
    accent?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    text: true;
  }
}

const headingStyle = { fontWeight: 600 };

let theme = createTheme({
  typography: {
    fontFamily: "Onest Variable",
    allVariants: {
      color: "#F7E0E0",
    },
    h1: headingStyle,
    h2: headingStyle,
    h3: headingStyle,
    h4: headingStyle,
    h5: headingStyle,
    h6: headingStyle,
    button: { fontWeight: 700 },
  },
  palette: {
    mode: "dark",
    background: {
      default: "#1F0808",
      paper: "#120303",
      // paper: "#000000",
    },
    primary: {
      main: "#910D0D", // red
    },
    secondary: {
      main: "#834620",
    },
    text: {
      primary: "#F7E0E0",
      // secondary: alpha("#A9A9A9", 0.6), // Faded text
    },
    success: {
      main: "#18AC2A",
    },
    buttonBlue: {
      main: "#15178B",
    },
    accent: {
      main: "#CE8B37",
    },
  },
});

// Makes the font size responsive
theme = responsiveFontSizes(theme);

export default theme;
