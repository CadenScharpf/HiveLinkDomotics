import { useContext, useEffect, useState } from "react";
import { IRouteProps } from "../../../../common/types/IRouteProps";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../common/hooks/auth";
import {
  IPathConfig,
  getFilteredSubpaths,
  templatePath,
} from "../../../../common/constants/Paths";
import {
  Box,
  IconButton,
  LinearProgress,
  Stack,
  SxProps,
  Tooltip,
  Typography,
} from "@mui/material";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import _, { set } from "lodash";
import { user_device } from "hive-link-common";
import DevicesDashboard from "./DevicesDashboard";
import { useHomeData } from "../Home";


interface IDevicesLayoutProps extends IRouteProps {}

function DevicesLayout(props: IDevicesLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const homeContext = useHomeData();
  const path = templatePath(props.path, {
    userHomeId: homeContext.id.toString(),
  });

  var isBase = location.pathname === path;
  const role = auth.user ? auth.user.role : -1;
  const navPaths = getFilteredSubpaths("devices", role, ["new"]);
  const [devices, setDevices] = useState<user_device[]>();

  useEffect(() => {}, [location.pathname, auth.user]);

  /* useEffect(() => {
    auth.user
      ?.getDevices(homeContext.id)
      .then((_devices) => {
        setDevices(_devices);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth.user, homeContext]); */

  /* return  (

    
    <Box sx={styles.container}>
      {devices ? (<><Box sx={styles.nav}>
        <Typography variant="h6">Devices</Typography>
        <Stack direction="row" spacing={1}>
          {navPaths.map((_path: IPathConfig) => {
            const linkPath = path + "/" + _path.Base + "/";
            return (
              <Link key={linkPath + "::nav_item_key"} to={linkPath}>
                {_path.Title || _.capitalize(_path.Base)}
              </Link>
            );
          })}
        </Stack>
        <Stack direction="row" spacing={1}>
          <Tooltip title={isBase ? "Global Filters" : "All Devices"}>
            {isBase ? (
              <IconButton onClick={() => navigate(path)}>
                <FilterListOffIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => navigate(path)}>
                <FilterListIcon />
              </IconButton>
            )}
          </Tooltip>
          <Tooltip title={"Add Device"}>
            <IconButton onClick={() => navigate(path + "/new")}>
              <AddToQueueIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
      {isBase ? (
        <DevicesDashboard devices={devices} />
      ) : (
        <div>
          <Outlet />
        </div>
      )}</>) : (<><LinearProgress color="primary" sx={{width: '100%'}} /></>)}
      
    </Box>

  )  */

  return <>user devices</>
}

// Devices Component Styles
const styles: Record<string, SxProps> = {
  container: {
    width: "100%",
    height: "100%",
    background: "#71797E",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  nav: {
    width: "100%",
    background: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export default DevicesLayout;
