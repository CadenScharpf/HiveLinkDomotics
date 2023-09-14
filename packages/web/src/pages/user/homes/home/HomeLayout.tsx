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
import { getFilteredSubpaths, templatePath } from "../../../common/constants/Paths";
import { Box, Stack} from "@mui/material";
import _ from "lodash";

function HomeLayout(props: IRouteProps) {
  const location = useLocation();
  const auth = useAuth();
  const isBase = location.pathname === props.path;
  const { userHomeId } = useParams();
  const homeContext = useContext(HomeContext);
  const path = templatePath(props.path, { userHomeId: homeContext.userHomeId });

  const navPaths = getFilteredSubpaths(
    ":userHomeId",
    auth.user ? auth.user.role : -1,
    []
  );
  return (
    <Box sx={styles.container}>
      <Box sx={{ ...styles.userNav, display: isBase ? "flex" : "flex" }}>
       
        <Stack direction="row" spacing={1} sx={styles.userNavItems}>
          {navPaths.map((path: any) => {
            let linkPath = templatePath(props.path + "/" + path.Base, {userHomeId: homeContext.userHomeId});
            return (
              <Link key={linkPath + "::nav_item_key"} to={linkPath}>
                {path.Title || _.capitalize(path.Base)}
              </Link>
            ); 
          })}
        </Stack>
        <Stack direction="row" spacing={1} sx={styles.userNavItems}>
        </Stack>
      </Box>
      <Box sx={styles.userContent}>
        {userHomeId && location.pathname.endsWith(userHomeId)? (
        <div>
          <h5>Home {userHomeId} dashboard</h5>
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
