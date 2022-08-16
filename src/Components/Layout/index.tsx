import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";
import Header from "./Header";

const Layout = (props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
}) => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#fff", height: "100vh" }}>{props.children}</Box>
      </Container>
    </>
  );
};

export default Layout;
