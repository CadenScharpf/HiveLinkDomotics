import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Stack,
  SxProps,
} from "@mui/material";
import React from "react";
import { useAuth } from "../hooks/auth";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { Link, Route, useLocation, useNavigate } from "react-router-dom";
import Paths, { IPath } from "../pages/common/constants/Paths";
import { IUser } from "hive-link-common";
import _ from "lodash";

function NavBar() {
  const navigate = useNavigate();
  const auth = useAuth();

  const styles: Record<string, SxProps> = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    stack: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
    },
  };

  const userPaths = Paths.Subpaths.filter((path: IPath) => {
    const exclude = ["login", "register"];
    const role = auth.user ? auth.user.role : -1;

    return (
      (path.Roles.includes(role) || path.Roles.length === 0) &&
      !exclude.includes(path.Base)
    );
  });

  return (
    <Box sx={{ ...styles.nav }}>
      <Stack direction={"row"} spacing={1} sx={{ ...styles.stack }}>
        <CleaningServicesIcon sx={{ fontSize: "3rem" }} />
        <h3>HL</h3>
      </Stack>
      <Stack direction={"row"} spacing={2} sx={{ ...styles.stack }}>
        {getNavItems(userPaths, "/")}
      </Stack>
      <Stack direction={"row"} spacing={2} sx={{ ...styles.stack }}>
        {auth.user ? (
          <>
            <Link to={"/user/profile"}>{auth.user.firstName}</Link>
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
