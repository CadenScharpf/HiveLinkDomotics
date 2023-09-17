import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { IRouteProps } from "../common/types/IRouteProps";
import { IPath, getFilteredSubpaths } from "../common/constants/Paths";
import { useAuth } from "../../hooks/auth";
import { Box, Container, Stack, Typography } from "@mui/material";
import _ from "lodash";

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

  useEffect(() => {}, [location.pathname, auth.user]);
  return (
    <>
     {/*  <UserNav path={props.path} /> */}

        {location.pathname === props.path ? (
          <div>user dashboard</div>
        ) : (
          <Outlet />
        )}
    </>
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
  userNav: {
    width: "100%",
    height: `${layout.navHeight}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  userNavItems: { alignItems: "center" },
};

export default UserLayout;
