import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import TopTrack from "./top-track";

function ToptrackPage() {
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [backgroundColor2, setBackgroundColor2] = useState<string>("");
  const [backgroundColor3, setBackgroundColor3] = useState<string>("");


  useEffect(() => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBackgroundColor(randomColor);
    const randomColor2 = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBackgroundColor2(randomColor2);
    const randomColor3 = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBackgroundColor3(randomColor3);
  }, []);
  return (
    <>
      <Navbar />
    <Box bgGradient={`linear(160deg, ${backgroundColor}, ${backgroundColor2} 35%, ${backgroundColor3}  100%)`} height="100%">
      <Box fontSize={"36"}>Top Track</Box>
      <TopTrack />
    </Box>
    </>
  );
}

export default ToptrackPage;
