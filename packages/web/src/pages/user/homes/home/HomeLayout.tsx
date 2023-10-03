import React, { useContext } from "react";
import { IRouteProps } from "../../../common/types/IRouteProps";
import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useMatches,
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
import Home, { HomeProvider } from "./Home";
import HomeDash from "./HomeDash";

interface IHomeLayoutProps extends IRouteProps {
  homeInfo? : Home;
}
function HomeLayout(props: IHomeLayoutProps) {
  const [navOpen, setNavOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const { userHomeId } = useParams();
  const home = useLoaderData() as Home;

  const matches = useMatches();
  let filteredMatches = matches.filter((match: any) => Boolean(match.handle?.crumb));
  let lastMatch = filteredMatches.length > 0 ? filteredMatches[filteredMatches.length - 1] : null;
  let handle = lastMatch ? lastMatch.handle as {crumb: (data: any) => string} : null;

  const pathWithParams = templatePath(props.path, {
    userHomeId: home.id.toString(),
  });
  const navPaths = getFilteredSubpaths(
    ":userHomeId",
    auth.user ? auth.user.role : -1,
    []
  );


  return (
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
              <Typography sx={{}} variant="h5">{home.name}</Typography>
            </Button>
          </Tooltip>

          {navPaths.map((path: any) => {
            return (
              <Button
                key={`${pathWithParams}/${path.Base}::nav_item_key`}
                variant="text"
                sx={{  }}
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

        {/* <Stack direction="row" spacing={1} sx={{...styles.navItems,}} >
        <Typography color="primary">{handle ? (handle.crumb(lastMatch?.data) || "") : ""}</Typography>
        </Stack> */}

        <Stack direction="row" spacing={1} sx={styles.navItems}></Stack>
      </Box>
      <Box sx={styles.userContent}>
        {userHomeId && location.pathname.endsWith("homes/" + userHomeId) ? (
          <HomeDash home={home} homeRoutePath={location.pathname}/>
        ) : (
            <HomeProvider home={home}>
              <Outlet />
            </HomeProvider>
        )}
      </Box>
    </>
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
    background: 'white'
  },
  nav: {
    width: "100%",
    height: layout.navHeight,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "none",
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
