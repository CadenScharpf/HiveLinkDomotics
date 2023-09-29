import React, { createContext, useContext } from "react";
import { IRouteProps } from "../../common/types/IRouteProps";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../common/hooks/auth";
import { getFilteredSubpaths } from "../../common/constants/Paths";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import _ from "lodash";
import AddHomeIcon from '@mui/icons-material/AddHome';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import HomesPage from "./HomesPage";

export const HomesContext = createContext({ userHomeId: -1 });

function HomesLayout(props: IRouteProps) {
  const location = useLocation();
  const auth = useAuth();
  const isBase = location.pathname === props.path;
  const navigate = useNavigate();
  const { userHomeId } = useParams();
  const homeId = parseInt(userHomeId?? "-1");
  
  const navPaths = getFilteredSubpaths(
    "homes",
    auth.user ? auth.user.role : -1,
    [":userHomeId", "new"]
  );
  
  return (
    <Box sx={styles.container}>
      <Box id="homes-nav" sx={{ ...styles.nav, display: isBase ? "flex" : "none" }}>
        <Box>
          {userHomeId && (<h5>Home id: {userHomeId}</h5>)}
        </Box>
        
        <Stack direction="row" spacing={1} sx={styles.navItems}>
          <Tooltip title={"Add Home"}>
            <IconButton onClick={() => {navigate(props.path+"/new")}}>
              <AddHomeIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
      <Box sx={{...styles.userContent, height: `calc(100% - ${isBase? layout.navHeight: 0}px)`,}}>
        {isBase ? (
          <HomesPage path={props.path} />
        ) : (
            <HomesContext.Provider value={{ userHomeId: homeId}}>
              <Outlet />
            </HomesContext.Provider>
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
    padding: 0,

  },
  nav: {
    width: "100%",
    height: `${layout.navHeight}px`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    //backgroundImage: `linear-gradient(to bottom, ${layout.color1} 35%, ${layout.color2})`,
  },
  navItems: { alignItems: "center" },
  userContent: {
    
    width: "100%",

    /* border: "1.5px solid black", */
  },
};


export default HomesLayout;
