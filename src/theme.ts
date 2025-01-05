import { createTheme, responsiveFontSizes, alpha } from "@mui/material";
declare module "@mui/material/styles" {
    interface Palette {
        buttonBlue?: Palette["primary"];
        accent: Palette["primary"];
    }
    interface PaletteOptions {
        buttonBlue?: PaletteOptions["primary"];
        accent?: PaletteOptions["primary"]
    }
}

let theme = createTheme({
    typography: {
        fontFamily: "Onest Variable",
        allVariants: {
            color: "#F7E0E0"
        },
        h1: { fontWeight: 800 },
        h2: { fontWeight: 800 },
        h3: { fontWeight: 800 },
        h4: { fontWeight: 800 },
        button: { fontWeight: 700 }
    },
    palette: {
        mode: "dark",
        background: {
            default: "#1F0808",
            paper: "#120303"
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
        accent: {
            main: "#CE8B37",
        }
    },
});

// Makes the font size responsive
theme = responsiveFontSizes(theme);

export default theme;
