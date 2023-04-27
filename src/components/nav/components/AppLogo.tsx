import styled from "styled-components";
import { Link } from "react-router-dom";
import Box from "../../box/Box";
import { Text } from "../../../ui";
import Logo from "../../../assets/logo.png";

const AppLogo = () => (
  <Link to="/dashboards/crm/">
    <Box display="flex" align="center" space={0.4}>
      <StyledLogo src={Logo} alt="app logo" />
      <Text heading="h6" weight="bold" classes="app-text-logo">
        RWEBIITA PREP. SCH.
      </Text>
    </Box>
  </Link>
);
export default AppLogo;

const StyledLogo = styled("img")`
  height: 45px;
  width: 50px;
  object-fit: contained;
`;
