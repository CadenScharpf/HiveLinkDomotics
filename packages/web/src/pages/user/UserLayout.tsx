import React, { useContext, useEffect } from "react";
import {
  Link,
  Outlet,
  RouteMatch,
  useLoaderData,
  useLocation,
  useMatches,
} from "react-router-dom";
import { IRouteProps } from "../common/types/IRouteProps";
import { IPath, getFilteredSubpaths } from "../common/constants/Paths";
import { useAuth } from "../../common/hooks/auth";
import { Box, Breadcrumbs, Container, Stack, Typography } from "@mui/material";
import _ from "lodash";
import { LayoutContext } from "../../App";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Home from "./homes/home/Home";
import UserDashPage from "./UserDashPage";

interface IUserLayoutProps extends IRouteProps {}

const layout = {
  navHeight: 40,
  color1: "black",
  color1p5: "#535353",
  color2: "white",
};

function UserLayout(props: IUserLayoutProps) {
  const location = useLocation();

  return (
    <Box id="user-layout" sx={{ ...styles.userLayout }}>
      <Box
        id="user-content"
        sx={{
          ...styles.userContent,
        }}
      >
        {location.pathname === props.path ? (
          <>
            <UserDashPage/>
          </>
        ) : (
          <Outlet />
        )}
      </Box>
    </Box>
  );
}

function UserNav(props: { path: string }) {
  const auth = useAuth();
  const navPaths = getFilteredSubpaths(
    "user",
    auth.user ? auth.user.role : -1,
    ["profile"]
  );
  return (
    <Box id="userNav" sx={styles.userNav}>
      <Stack direction="row" spacing={1} sx={styles.userNavItems}>
        <Link to={props.path}> Account </Link>
        {navPaths.map((path: any) => {
          let linkPath = props.path + "/" + path.Base;
          return (
            <Link key={linkPath + "::nav_item_key"} to={linkPath}>
              {path.Title || _.capitalize(path.Base)}
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
}

// UserLayout Component Styles
const styles: Record<string, any> = {
  userLayout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "100%",
    /*     background: 'white',
    maxWidth: 2000, */
  },
  userNav: {
    width: "100%",
    height: `${layout.navHeight}px`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    px: "8px",
    py: "6px",
  },
  breadCrumb: { textDecoration: "none" },
  userContent: {
    width: "100%",
    height: `calc(100%)`,
    border: "1px solid grey",
    borderTop: "none",
  },
  userNavItems: { alignItems: "center" },
};

export default UserLayout;
