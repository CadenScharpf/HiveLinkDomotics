import {
  Box,
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  SxProps,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useAuth } from "../../hooks/auth";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { Link, Route, useLocation, useNavigate } from "react-router-dom";
import pathConfig, {
  IPathConfig,
  getFilteredSubpaths,
} from "../../pages/common/constants/Paths";
import { user } from "hive-link-common";
import _ from "lodash";
import MenuIcon from "@mui/icons-material/Menu";
import { LayoutContext } from "../../App";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { pink } from "@mui/material/colors";
import HiveIcon from '@mui/icons-material/Hive';

interface INavBarProps {
  toggleSideBar: () => void;
}
function NavBar(props: INavBarProps) {
  const navigate = useNavigate();
  const layoutContext = useContext(LayoutContext);
  const auth = useAuth();

  const styles: Record<string, SxProps> = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: `${layoutContext.navHeight}px`,
      width: "100%",
      position: 'absolute',
      top: 0,
      left: 0,
      color: 'grey',
      zIndex: 1000,
    },
    stack: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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
        <IconButton sx={{color: 'grey'}} onClick={props.toggleSideBar}>
          <MenuIcon sx={{fontSize: '2rem'}}/>
        </IconButton>
        <HiveIcon sx={{ fontSize: "3rem", color: '#E9AB17'}} />
        <Typography variant="h4">HiveLink Domotics</Typography>
      </Stack>
      <Stack direction={"row"} spacing={2} sx={{ ...styles.stack }}></Stack>
      <Stack direction={"row"} spacing={2} sx={{ ...styles.stack }}>
        {auth.user ? (
          <>
            {/* {getNavItems(navPaths, "/user/")} */}
            <Tooltip title={"My Homes"}>
              <IconButton
                onClick={() => {
                  navigate("/user/homes");
                }}
              >
                <HolidayVillageIcon  sx={{color: 'grey'}}/>
              </IconButton>
            </Tooltip>
            <Tooltip title={_.capitalize(auth.user.first_name)}>
            <IconButton
             sx={{color: 'grey'}}
              onClick={() => {
                navigate("/user/profile");
              }}
            >
              <AccountBoxIcon sx={{color: 'grey'}}/>
            </IconButton>
            </Tooltip>
            <IconButton
              onClick={() => {
                auth.logout();
                navigate("/");
              }}
            >
              <LogoutIcon sx={{ color: pink[500] }} />
            </IconButton>
          </>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </Stack>
    </Box>
  );
}

const getNavItems = (
  paths: IPathConfig[],
  location: string
): JSX.Element[] | undefined => {
  return paths.map((path: IPathConfig) => {
    return (
      <Link key={location + path.Base + "key"} to={location + path.Base}>
        {_.capitalize(path.Title || path.Base)}
      </Link>
    );
  });
};

export default NavBar;
