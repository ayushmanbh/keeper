import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { styled } from "@mui/material/styles";

const HeaderBar = styled(AppBar)`
  background: #fff;
  height: 70px;
  box-shadow: inset 0 -1px 0 0 #dadce0;
  color: #000;
`;

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <HeaderBar position="static">
        <Toolbar>
          <TextSnippetIcon />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              color: "#5f6368",
              ml: 2,
              display: { xs: "none", sm: "block" },
            }}
          >
            Keeper
          </Typography>
        </Toolbar>
      </HeaderBar>
    </Box>
  );
};

export default Header;
