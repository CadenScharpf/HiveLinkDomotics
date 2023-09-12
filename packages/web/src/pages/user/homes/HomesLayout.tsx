import React from "react";
import { IRouteProps } from "../../common/types/IRouteProps";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/auth";
import { getFilteredSubpaths } from "../../common/constants/Paths";
import { Box, Stack } from "@mui/material";
import _ from "lodash";


function HomesLayout(props: IRouteProps) {
  const location = useLocation();
  const auth = useAuth();
  const isBase = location.pathname === props.path;
  const { id } = useParams();
  const navPaths = getFilteredSubpaths(
    "homes",
    auth.user ? auth.user.role : -1,
    []
  );
  return (
    <Box sx={styles.container}>
      <Box sx={{ ...styles.userNav, display: isBase ? "none" : "flex" }}>
        <p></p>
        <Stack direction="row" spacing={1} sx={styles.userNavItems}>
          {navPaths.map((path: any) => {
            let linkPath = (props.path + "/" + path.Base).replace( new RegExp(":id", "g"), id ? id : "-1");
            return (
              <Link key={linkPath + "::nav_item_key"} to={linkPath}>
                {path.Title || _.capitalize(path.Base)}
              </Link>
            );
          })}
        </Stack>
        <p></p>
      </Box>
      <Box sx={styles.userContent}>
        {isBase ? (
          <div>My Homes Dashboard</div>
        ) : (
          <Outlet />
        )}
      </Box>
    </Box>
  );
}

const layout = {
  navHeight: 40,
  color1: "black",
  color1p5: "#535353",
  color2: "white",
};

const styles: Record<string, any> = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 5,
    border: '1.5px solid black'
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
    border: "1.5px solid black",
  },
};

export default HomesLayout;
