import { IRoute } from "express";
import React, { useContext } from "react";
import { IRouteProps } from "../../../common/types/IRouteProps";
import { HomeContext } from "../HomesLayout";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useAuth } from "../../../../hooks/auth";
import { getFilteredSubpaths } from "../../../common/constants/Paths";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import _ from "lodash";

function HomeLayout(props: IRouteProps) {
  const location = useLocation();
  const auth = useAuth();
  const isBase = location.pathname === props.path;
  const navigate = useNavigate();
  const { homeId } = useParams();

  const navPaths = getFilteredSubpaths(
    ":homeId",
    auth.user ? auth.user.role : -1,
    []
  );
  const homeContext = useContext(HomeContext);
  return (
    <Box sx={styles.container}>
      <Box sx={{ ...styles.userNav, display: isBase ? "flex" : "flex" }}>
       
        <Stack direction="row" spacing={1} sx={styles.userNavItems}>
          {navPaths.map((path: any) => {
            let linkPath = (props.path + "/" + path.Base).replace(
              new RegExp("/:homeId", "g"),
              homeId ? `/${homeId}` : ""
            );
            return (
              <Link key={linkPath + "::nav_item_key"} to={linkPath}>
                {path.Title || _.capitalize(path.Base)}
              </Link>
            ); 
          })}
        </Stack>
        <Stack direction="row" spacing={1} sx={styles.userNavItems}>
          <Tooltip title={"All Homes"}>
            <IconButton
              onClick={() => {
                navigate(props.path);
              }}
            ></IconButton>
          </Tooltip>
          <Tooltip title={"Add Home"}>
            <IconButton
              onClick={() => {
                navigate(props.path + "/new");
              }}
            ></IconButton>
          </Tooltip>
        </Stack>
      </Box>
      <Box sx={styles.userContent}>
        {homeId && location.pathname.endsWith(homeId)? (
        <div>
          <h5>Home {homeId} dashboard</h5>
        </div>
        ): (
        <Outlet />)}
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
    paddingBottom: 0,
  },
  userNav: {
    width: "100%",
    height: layout.navHeight,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderTop: '1.5px solid black', 
    borderBottom: '1.5px solid black' 
    //backgroundImage: `linear-gradient(to bottom, ${layout.color1} 35%, ${layout.color2})`,
  },
  userNavItems: { alignItems: "center" },
  userContent: {
    height: `calc(100% - ${layout.navHeight}px)`,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    

  },
};

export default HomeLayout;
