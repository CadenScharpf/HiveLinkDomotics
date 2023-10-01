import {
  Box,
  Breadcrumbs,
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
import { useAuth } from "../../../common/hooks/auth";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import {
  Link,
  Route,
  useLocation,
  useMatches,
  useNavigate,
} from "react-router-dom";
import pathConfig, {
  IPathConfig,
  getFilteredSubpaths,
} from "../../../pages/common/constants/Paths";
import { user } from "hive-link-common";
import _ from "lodash";
import MenuIcon from "@mui/icons-material/Menu";
import { LayoutContext } from "../../../App";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { pink } from "@mui/material/colors";
import HiveIcon from "@mui/icons-material/Hive";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface INavBarProps {
  toggleSideBar: () => void;
}
function NavBar(props: INavBarProps) {
  const navigate = useNavigate();
  const layoutContext = useContext(LayoutContext);
  const auth = useAuth();
  const matches = useMatches();

  const styles: Record<string, SxProps> = {
    NavBar: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
    },
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: `${layoutContext.appBarHeight}px`,
      background: '#006cb4',
      width: "100%",
      color: "white",
      zIndex: 1000,
    },
    crumbs: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: `${layoutContext.crumbsHeight}px`,
      width: "100%",
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
    <Box sx={styles.NavBar}>
      <Box sx={{ ...styles.nav }}>
        <Stack direction={"row"} spacing={1} sx={{ ...styles.stack }}>
          <IconButton sx={{ color: "white" }} onClick={props.toggleSideBar}>
            <MenuIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
          <HiveIcon sx={{ fontSize: "2.2rem", color: "#E9AB17" }} />
          <Typography variant="h5">HiveLink</Typography>
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
                  <HolidayVillageIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title={_.capitalize(auth.user.first_name)}>
                <IconButton
                  sx={{ color: "grey" }}
                  onClick={() => {
                    navigate("/user/profile");
                  }}
                >
                  <AccountBoxIcon sx={{ color: "white" }} />
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
      <Box sx={styles.crumbs}>

      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            {matches
              .filter((match: any) => Boolean(match.handle?.crumb))
              .map((match: any) => {
                return (
                  <Box
                    component={Link}
                    key={match.pathname + "::bread-crumb"}
                    to={match.pathname}
                    sx={{ textDecoration: "none" }}
                  >
                    {match.handle?.crumb(match.data)}
                  </Box>
                );
              })}
          </Breadcrumbs>

      </Box>
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
