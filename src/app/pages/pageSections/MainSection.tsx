import { FlipWords } from "@/components/ui/flip-words";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
// export const MainSection = () => {
//   const words = ["adapters", "cables", "wires", "connectors"];
//   return (
//     <Box
//       sx={{
//         backgroundImage: `url(./cables.jpg)`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         height: "85vh",
//         width: "100%",
//         position: "relative",
//         p: 0,
//         px: 0,
//         // filter: "brightness(0.5)",
//       }}
//     >
//       {/* Shadow overlay */}
//       <Box
//         sx={{
//           height: "100%",
//           width: "100%",
//           background: "linear-gradient(to bottom, transparent, 90%, black)",
//         }}
//       >
//         <Box
//           sx={{
//             height: "100%",
//             width: "100%",
//             backgroundColor: "rgba(0, 0, 0, 0.7)",
//             px: 12,
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <Navbar transparent />
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               gap: 3,
//               alignItems: "center",
//               justifyContent: "center",
//               flex: 1,
//               // border: 1,
//             }}
//           >
//             <Box
//               width={"55%"}
//               sx={{
//                 // border: 1,
//                 // flex: 0.3,
//                 fontSize: "2.5rem",
//                 fontWeight: "bold",
//                 mx: "auto",
//                 textTransform: "uppercase",
//                 //   textAlign: "center",
//               }}
//             >
//               All of your
//               <FlipWords
//                 duration={4000}
//                 words={words}
//                 className="dark:text-[#CE8B37]"
//               />{" "}
//               <br />
//               in one place.
//             </Box>
//             <Typography
//               variant="body1"
//               sx={{
//                 "&:hover": { cursor: "pointer", textDecoration: "underline" },
//               }}
//             >
//               Explore
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

export const MainSection = () => {
  const images = ["adapters.png", "cable.png", "connector.png"];
  const [currentSrc, setCurrentSrc] = useState(images[0]);
  const words = ["adapters", "cables", "connectors"];
  const handleChange = () => {
    const src = images[images.indexOf(currentSrc) + 1] || images[0];
    setCurrentSrc(src);
  };
  return (
    <Box
      sx={{
        height: "85vh",
        width: "100%",
        position: "relative",
        p: 0,
        px: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          // flexDirection: "column",
          gap: 3,
          alignItems: "center",
          justifyContent: "space-between",
          flex: 1,
          // border: 1,
          height: "100%",
          px: 6,
        }}
      >
        <Box
          // width={"55%"}
          sx={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            // mx: "auto",
            textTransform: "uppercase",
          }}
        >
          All of your
          <FlipWords
            onChange={handleChange}
            duration={4000}
            words={words}
            className="dark:text-[#CE8B37]"
          />{" "}
          <br />
          in one place.
        </Box>
        <Box sx={{}}>
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            exit={{
              opacity: 0,
              y: -40,
              x: 40,
              filter: "blur(8px)",
              scale: 2,
              position: "absolute",
            }}
            className={cn(
              "z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100 px-2"
            )}
            key={currentSrc}
          >
            <motion.span
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.3,
                duration: 0.3,
              }}
            >
              <Box component="img" src={currentSrc} sx={{ height: "20rem" }} />
            </motion.span>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};
