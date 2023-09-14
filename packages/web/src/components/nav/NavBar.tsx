import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  SxProps,
} from "@mui/material";
import React from "react";
import { useAuth } from "../../hooks/auth";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { Link, Route, useLocation, useNavigate } from "react-router-dom";
import Paths, { IPath, getFilteredSubpaths } from "../../pages/common/constants/Paths";
import { user } from "hive-link-common";
import _ from "lodash";
import MenuIcon from '@mui/icons-material/Menu'; 


interface INavBarProps {
  toggleSideBar: () => void;
}
function NavBar(props: INavBarProps) {
  const navigate = useNavigate();
  const auth = useAuth();

  const styles: Record<string, SxProps> = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: '100%',
      width: '100%',
    },
    stack: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
    },
  };

  const navPaths = getFilteredSubpaths(
    "user",
    auth.user ? auth.user.role : -1,
    ["profile"]
  );

  return (
    <Box sx={{ ...styles.nav }}>
      <Stack direction={"row"} spacing={1} sx={{ ...styles.stack }}>
      <IconButton
        sx={{ }}
        onClick={props.toggleSideBar}
      >
        <MenuIcon />
      </IconButton>
        <CleaningServicesIcon sx={{ fontSize: "3rem" }} />
        <h3>HL Domotics</h3>
      </Stack>
      <Stack direction={"row"} spacing={2} sx={{ ...styles.stack }}>
         
      </Stack>
      <Stack direction={"row"} spacing={2} sx={{ ...styles.stack }}>
        {auth.user ? (
          <>
            {getNavItems(navPaths, "/user/")} 
            <Link to={"/user/profile"}>{_.capitalize(auth.user.first_name)}</Link> 
            <button
              onClick={() => {
                auth.logout();
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </Stack>
    </Box>
  );
}

const getNavItems = (
  paths: IPath[],
  location: string
): JSX.Element[] | undefined => {
  return paths.map((path: IPath) => {
    return (
      <Link key={location+path.Base+"key"} to={location + path.Base} >
        {_.capitalize(path.Title || path.Base)}
      </Link>
    );
  });
};

export default NavBar;
