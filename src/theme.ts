import { createTheme, responsiveFontSizes, ThemeOptions } from "@mui/material";
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

// let theme = createTheme({
//   typography: {
//     fontFamily: "Onest Variable",
//     allVariants: {
//       // color: "#F7E0E0",
//       color: "#000000",
//     },
//     h1: headingStyle,
//     h2: headingStyle,
//     h3: headingStyle,
//     h4: headingStyle,
//     h5: headingStyle,
//     h6: headingStyle,
//     button: { fontWeight: 700 },
//   },
//   palette: {
//     // mode: "dark",
//     background: {
//       // default: "#1F0808",
//       default: "#FFFFFF",
//       paper: "#1F0808",
//       // paper: "#120303",
//       // paper: "#000000",
//     },
//     primary: {
//       main: "#910D0D", // red
//     },
//     secondary: {
//       main: "#834620",
//     },
//     text: {
//       // primary: "#F7E0E0",
//       primary: "#000000",
//       // secondary: alpha("#A9A9A9", 0.6), // Faded text
//     },
//     success: {
//       main: "#18AC2A",
//     },
//     buttonBlue: {
//       main: "#15178B",
//     },
//     accent: {
//       main: "#CE8B37",
//     },
//   },
// });

export const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: "Onest Variable",
    h1: headingStyle,
    h2: headingStyle,
    h3: headingStyle,
    h4: headingStyle,
    h5: headingStyle,
    h6: headingStyle,
    button: { fontWeight: 700 },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#1f0808",
    },
    secondary: {
      main: "#834620",
      light: "#9b6b4c",
      dark: "#5b3116",
      contrastText: "#ffffff",
    },
    error: {
      main: "#d32f2f",
      light: "#db5858",
      dark: "#932020",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ed6c02",
      light: "#f08934",
      dark: "#a54b01",
      contrastText: "#ffffff",
    },
    info: {
      main: "#0288d1",
      light: "#349fda",
      dark: "#015f92",
      contrastText: "#ffffff",
    },
    success: {
      main: "#2e7d32",
      light: "#57975b",
      dark: "#205723",
      contrastText: "#ffffff",
    },
    divider: "rgba(0,0,0,0.12)",
    background: {
      default: "#ffffff",
      paper: "#f3f1f1",
    },
    text: { primary: "#000000" },
    
  },
};

let theme = createTheme(themeOptions);

// Makes the font size responsive
theme = responsiveFontSizes(theme);

export default theme;
