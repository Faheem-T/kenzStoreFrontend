import { Navbar } from "@/app/components/Navbar";
import { FlipWords } from "@/components/ui/flip-words";
import { Box, Typography } from "@mui/material";
export const MainSection = () => {
  const words = ["adapters", "cables", "wires", "connectors"];
  return (
    <Box
      sx={{
        backgroundImage: `url(./cables.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "85vh",
        width: "100%",
        position: "relative",
        p: 0,
        px: 0,
        // filter: "brightness(0.5)",
      }}
    >
      {/* Shadow overlay */}
      <Box
        sx={{
          height: "100%",
          width: "100%",
          background: "linear-gradient(to bottom, transparent, 90%, black)",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            px: 12,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Navbar transparent />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              // border: 1,
            }}
          >
            <Box
              width={"55%"}
              sx={{
                // border: 1,
                // flex: 0.3,
                fontSize: "2.5rem",
                fontWeight: "bold",
                mx: "auto",
                textTransform: "uppercase",
                //   textAlign: "center",
              }}
            >
              All of your
              <FlipWords
                duration={4000}
                words={words}
                className="dark:text-[#CE8B37]"
              />{" "}
              <br />
              in one place.
            </Box>
            <Typography
              variant="body1"
              sx={{
                "&:hover": { cursor: "pointer", textDecoration: "underline" },
              }}
            >
              Explore
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
