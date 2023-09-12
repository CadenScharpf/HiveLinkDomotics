import React, { createContext, useContext } from "react";
import { IRouteProps } from "../../common/types/IRouteProps";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/auth";
import { getFilteredSubpaths } from "../../common/constants/Paths";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import _ from "lodash";
import AddHomeIcon from '@mui/icons-material/AddHome';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import HomesDashboard from "./HomesDashboard";

export const HomeContext = createContext({ homeId: "-1" });

function HomesLayout(props: IRouteProps) {
  const location = useLocation();
  const auth = useAuth();
  const isBase = location.pathname === props.path;
  const navigate = useNavigate();
  const { id } = useParams();
  
  const navPaths = getFilteredSubpaths(
    "homes",
    auth.user ? auth.user.role : -1,
    [":home_id", "new"]
  );
  return (
    <Box sx={styles.container}>
      <Box sx={{ ...styles.userNav, display: isBase ? "flex" : "flex" }}>
        <Stack direction="row" spacing={1} sx={styles.userNavItems}>
          
        </Stack>
        <Stack direction="row" spacing={1} sx={styles.userNavItems}>
          {navPaths.map((path: any) => {
            let linkPath = (props.path + "/" + path.Base).replace( new RegExp("/:home_id", "g"), id ? `/${id}` : "");
            return (
              <Link key={linkPath + "::nav_item_key"} to={linkPath}>
                {path.Title || _.capitalize(path.Base)}
              </Link>
            );
          })}
        </Stack>
        <Stack direction="row" spacing={1} sx={styles.userNavItems}>
        <Tooltip title={"All Homes"}>
            <IconButton onClick={() => {navigate(props.path)}}>
              <HolidayVillageIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Add Home"}>
            <IconButton onClick={() => {navigate(props.path+"/new")}}>
              <AddHomeIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
      <Box sx={styles.userContent}>
        {isBase ? (
          <HomesDashboard path={props.path} />
        ) : (
            <HomeContext.Provider value={{ homeId: id?? "-1" }}>
              <Outlet />
            </HomeContext.Provider>
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
