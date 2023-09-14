import React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { IPath, getFilteredSubpaths } from "../../pages/common/constants/Paths";
import { useAuth } from "../../hooks/auth";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";
import { grey } from "@mui/material/colors";

interface ISideBarProps {
  open: boolean;
  onClose: () => void;
}

const drawerBleeding = 56;

const SideBar: React.FC<ISideBarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const baseRoutes = getFilteredSubpaths("/", auth.user ? auth.user.role : -1, [
    "login",
    "register",
  ]);
  return (
    <SwipeableDrawer
      sx={{ position: "absolute", top: 64 }}
      anchor="left"
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      swipeAreaWidth={0}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
    >

    

      <List>
        {baseRoutes.map((path: IPath) => {
          let linkPath = path.Base;
          return (
            <ListItem
              button
              key={linkPath + "::nav_item_key"}
              onClick={() => {
                navigate("/" + path.Base);
              }}
            >
              <ListItemText primary={path.Title || _.capitalize(path.Base)} />
            </ListItem>
          );
        })}
      </List>
      <Puller id="sidebar-puller" />
    </SwipeableDrawer>
  );
};

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  right: 0,
  top: 0,
  bottom: 0,
  marginTop: "auto",
    marginBottom: "auto",
  /* top: "calc(0% - 15px)", */
  transform: 'rotate(90deg)',
}));

export default SideBar;
