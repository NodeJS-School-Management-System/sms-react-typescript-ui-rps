import { LinkedIn, Twitter } from "@mui/icons-material";
import styled from "styled-components";
import useTheme from "../../theme/useTheme";
import { Text as CText } from "@chakra-ui/react";
import Box from "../box/Box";

const Footer = () => {
  const {
    theme: {
      layout: { footerPosition },
      primaryColor,
    },
  } = useTheme();
  if (footerPosition === "hidden") return <></>;

  return (
    <StyledFooter
      className={`footer_position--${footerPosition} ${
        footerPosition === "fixed" ? "fg-theme" : ""
      }`}
    >
      <CText fontSize={{ base: 12, md: 14, lg: 16 }}>
        Made with ❤️ by{" "}
        <a href="#" target={"_blank"} rel="noreferrer" className="text-primary">
          Quadral Technologies
        </a>
      </CText>
      <Box display="flex" space={0.6}>
        <a href="#" target={"_blank"} rel="noreferrer">
          <LinkedIn style={{ color: primaryColor.color }} />
        </a>
        <a href="#" target={"_blank"} rel="noreferrer">
          <Twitter style={{ color: primaryColor.color }} />
        </a>
      </Box>
    </StyledFooter>
  );
};
export default Footer;
const StyledFooter = styled("footer")`
  width: 100%;
  display: flex;
  align-item: center;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  z-index: 1;

  &.footer_position--fixed {
    position: sticky;
    bottom: 0;
    border-radius: 0.6rem;
    margin: 0 auto;
    width: calc(100% - 2rem);
  }
`;
