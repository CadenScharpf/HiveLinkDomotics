import React, { useContext } from "react";
import { IRouteProps } from "../../../common/types/IRouteProps";
import { HomesContext } from "../HomesLayout";
import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useAuth } from "../../../../common/hooks/auth";
import Paths, {
  getFilteredSubpaths,
  templatePath,
} from "../../../common/constants/Paths";
import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import _ from "lodash";
import { IHomeDetails, user_home } from "hive-link-common";
import Home from "./Home";

export const HomeContext = React.createContext<{home: Home | null}>({ home: null });

function HomeLayout(props: IRouteProps) {
  const [homeInfo, setHomeInfo] = React.useState<IHomeDetails>();
  const activeNavIndex = React.useRef(0);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const { userHomeId } = useParams();
  const _homeContext = useContext(HomesContext);
  const home = useLoaderData() as Home;
  

  const pathWithParams = templatePath(props.path, {
    userHomeId: home.id.toString(),
  });
  const navPaths = getFilteredSubpaths(
    ":userHomeId",
    auth.user ? auth.user.role : -1,
    []
  );

  React.useEffect(() => {
      Home
        .getHome(_homeContext.userHomeId)
        .then((home) => {
          setHomeInfo(home);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [auth.user, _homeContext.userHomeId]);

  return  (
    <>
      <Box
        sx={{
          ...styles.nav,
          display: location.pathname === props.path ? "flex" : "flex",
        }}
      >
        <Stack direction="row" spacing={1} sx={styles.navItems}>
          <Tooltip title={"Home Dashboard"}>
            <Button
              onClick={() => {
                navigate(pathWithParams);
              }}
              variant="text"
            >
              <Typography variant="h5">{home.name}</Typography>
            </Button>
          </Tooltip>

          {navPaths.map((path: any) => {
            return (
              <Button
                key={`${pathWithParams}/${path.Base}::nav_item_key`}
                variant="text"
                onClick={() => navigate(`${pathWithParams}/${path.Base}`)}
              >
                {path.Title || _.capitalize(path.Base)}
              </Button>
            );
          })}
        {/*   {navPaths.map((path: any) => {
            return (
                <></>
            );
          })} */}
        </Stack>

        <Stack direction="row" spacing={1} sx={styles.navItems}></Stack>

        <Stack direction="row" spacing={1} sx={styles.navItems}></Stack>
      </Box>
      <Box sx={styles.userContent}>
        {userHomeId && location.pathname.endsWith( "homes/" + userHomeId) ? (
          <div>
            <h5>Home {userHomeId} dashboard</h5>
          </div>
        ) : (
          <HomeContext.Provider value={{ home: new Home(home) }}>
          <Outlet />
          </HomeContext.Provider>
        )}
      </Box>
    </>
  ) ;
}

export const useHome = () => {
  const homeContext = useContext(HomeContext);
  return homeContext.home;
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
  nav: {
    width: "100%",
    height: layout.navHeight,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1.5px solid black",
    borderBottom: "1.5px solid black",
    //backgroundImage: `linear-gradient(to bottom, ${layout.color1} 35%, ${layout.color2})`,
  },
  navItems: { alignItems: "center" },
  userContent: {
    height: `calc(100% - ${layout.navHeight}px)`,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
};

export default HomeLayout;
