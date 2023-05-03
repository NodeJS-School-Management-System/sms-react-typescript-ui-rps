import styled from "styled-components";
import { Link } from "react-router-dom";
import Box from "../../box/Box";
import { Text as CText } from "@chakra-ui/react";
import Logo from "../../../assets/logo.png";

const AppLogo = () => (
  <Link to="/dashboards/crm/">
    <Box display="flex" align="center" space={0.4}>
      <StyledLogo src={Logo} alt="app logo" />
      <CText fontSize={17} fontWeight="bold">
        RWEBIITA PS.
      </CText>
    </Box>
  </Link>
);
export default AppLogo;

const StyledLogo = styled("img")`
  height: 45px;
  width: 50px;
  object-fit: contained;
`;
