import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { IRouteProps } from "../common/types/IRouteProps";
import { getFilteredSubpaths } from "../common/constants/Paths";
import { useAuth } from "../../hooks/auth";
import { Box, Container, Stack, Typography } from "@mui/material";
import _ from 'lodash';

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
  const navPaths = getFilteredSubpaths(
    "user",
    auth.user ? auth.user.role : -1,
    ["profile"]
  );

  useEffect(() => {}, [location.pathname, auth.user]);
  return (
    <Box sx={styles.container}>
      <Box sx={styles.userNav}>
        <p></p>
        <Stack direction="row" spacing={1} sx={styles.userNavItems}>
          <Link to={props.path}> Dashboard </Link>
          {navPaths.map((path: any) => {
            let linkPath = props.path + "/" + path.Base;
            return (
              <Link key={linkPath + "::nav_item_key"} to={linkPath}>
                {path.Title ||
                  _.capitalize(path.Base)}
              </Link>
            );
          })}
        </Stack>
        <p></p>
      </Box>
      <Box sx={styles.userContent}>
        {location.pathname === props.path ? (
          <div>user dashboard</div>
        ) : (
          <Outlet />
        )}
      </Box>
    </Box>
  );
}

// UserLayout Component Styles
const styles: Record<string, any> = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 5,
  },
  userNav: {
    width: "100vw",
    height: layout.navHeight,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    //backgroundImage: `linear-gradient(to bottom, ${layout.color1} 35%, ${layout.color2})`,
  },
  userNavItems: { alignItems: "center" },
  userContent: {
    height: `calc(100% - ${layout.navHeight}px)`,
    width: "100%",
    maxWidth: 1500,
    display: "flex",
    justifyContent: "center",

  },
};

export default UserLayout;
