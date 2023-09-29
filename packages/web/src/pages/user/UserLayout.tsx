import React, { useContext, useEffect } from "react";
import { Link, Outlet, RouteMatch, useLocation, useMatches } from "react-router-dom";
import { IRouteProps } from "../common/types/IRouteProps";
import { IPath, getFilteredSubpaths } from "../common/constants/Paths";
import { useAuth } from "../../common/hooks/auth";
import { Box, Container, Stack, Typography } from "@mui/material";
import _ from "lodash";
import { LayoutContext } from "../../App";

interface IUserLayoutProps extends IRouteProps {}

const layout = {
  navHeight: 40,
  color1: "black",
  color1p5: "#535353",
  color2: "white",
};

function UserLayout(props: IUserLayoutProps) {
  const location = useLocation();
  const auth = useAuth();
  const layoutContext = useContext(LayoutContext);
  const matches = useMatches();
  


  useEffect(() => {}, [location.pathname, auth.user]);
  return (
    <Box id="user-layout" sx={{ ...styles.userLayout }}>

      <Box
        id="user-content"
        sx={{
          ...styles.userContent,
        }}
      >
        <UserNav path={props.path} />

        {location.pathname === props.path ? (
          <div>user dashboard</div>
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
  },
  userNav: {
    width: "100%",
    height: `${layout.navHeight}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  userContent: {
    width: "100%",
    height: `calc(100% - ${layout.navHeight}px)`,
    maxWidth: 2000,
    border: "1.5px solid black",
  },
  userNavItems: { alignItems: "center" },
};

export default UserLayout;
