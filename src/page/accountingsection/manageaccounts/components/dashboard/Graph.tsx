import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import SideGraphAnalytics from "./SideGraphAnalytics";
const data = [
  { name: "Jan", uv: 400, pv: 2400, amt: 2400 },
  {
    name: "Feb",
    uv: 300,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Mar",
    uv: 350,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Apr",
    uv: 100,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "May",
    uv: 400,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Jun",
    uv: 379,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Jul",
    uv: 840,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Aug",
    uv: 150,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Sep",
    uv: 590,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Oct",
    uv: 1000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Nov",
    uv: 500,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Dec",
    uv: 700,
    pv: 2400,
    amt: 2400,
  },
];

const Graph = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const shouldDisplayComponent = windowWidth > 768;

  return (
    <Box>
      <Box
        fontWeight={"bold"}
        display="flex"
        alignItems={"center"}
        justifyContent="center"
        margin="auto"
        fontSize={13}
      >
        Working Capital Trend
      </Box>
      {shouldDisplayComponent && (
        <BarChart style={{}} width={600} height={350} data={data}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="uv" fill="#8884d8" barSize={30} />
        </BarChart>
      )}
      <Flex
        flexWrap={"wrap"}
        gap={4}
        align="center"
        justify={"center"}
        w={"90%"}
        h={"80%"}
        pb={2}
      >
        <Box fontWeight="bold" fontSize={13}>
          Selected Income & Expense Measures Vs Previous Period
        </Box>
        {[1, 2, 3, 4].map((sideanalytic: any) => (
          <SideGraphAnalytics key={sideanalytic} />
        ))}
      </Flex>
    </Box>
  );
};

export default Graph;
