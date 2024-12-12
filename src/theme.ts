import { createTheme, responsiveFontSizes, alpha } from "@mui/material";
declare module "@mui/material/styles" {
    interface Palette {
        buttonBlue?: Palette["primary"];
    }
    interface PaletteOptions {
        buttonBlue?: PaletteOptions["primary"];
    }
}

let theme = createTheme({
    typography: {
        fontFamily: "Onest Variable",
    },
    palette: {
        mode: "dark",
        background: {
            default: "#1F0808",
            paper: "#1F0808",
        },
        primary: {
            main: "#910D0D", // red
        },
        secondary: {
            main: "#834620",
        },
        text: {
            primary: "#F7E0E0",
            secondary: alpha("#A9A9A9", 0.6), // Faded text
        },
        success: {
            main: "#18AC2A",
        },
        buttonBlue: {
            main: "#15178B",
        },
    },
});

// Makes the font size responsive
theme = responsiveFontSizes(theme);

export default theme;
