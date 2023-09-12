import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { IRouteProps } from "../common/types/IRouteProps";
import { getFilteredSubpaths } from "../common/constants/Paths";
import { useAuth } from "../../hooks/auth";
import { Box, Container, Stack, Typography } from "@mui/material";

interface IUserLayoutProps extends IRouteProps {}

const layout = {
  navHeight: 50,
};

function UserLayout(props: IUserLayoutProps) {
  const location = useLocation();
  const auth = useAuth();
  const navPaths = getFilteredSubpaths(
    "user",
    auth.user ? auth.user.role : -1,
    ["profile"]
  );

  return (
    <Box sx={styles.container}>
      <Stack direction="row" spacing={1} sx={styles.userNavItems}>
        <Link to={props.path}> Dashboard </Link>
        {navPaths.map((path: any) => {
          let linkPath = props.path + "/" + path.Base;
          return (
            <Link key={linkPath + "::nav_item_key"} to={linkPath}>
              {path.Title ||
                path.Base.charAt(0).toUpperCase() + path.Base.slice(1)}
            </Link>
          );
        })}
      </Stack>
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
    background: "grey",
  },
  userContent: {
    height: `calc(100% - ${layout.navHeight}px)`,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  userNavItems: { height: layout.navHeight, alignItems: "center" },
};

export default UserLayout;
