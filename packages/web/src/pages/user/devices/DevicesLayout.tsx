import { useContext, useEffect } from "react";
import { IRouteProps } from "../../common/types/IRouteProps";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../../../hooks/auth";
import {
  IPath,
  getFilteredSubpaths,
  templatePath,
} from "../../common/constants/Paths";
import {
  Box,
  IconButton,
  Stack,
  SxProps,
  Tooltip,
  Typography,
} from "@mui/material";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import { HomeContext } from "../homes/HomesLayout";
import _ from "lodash";

interface IDevicesLayoutProps extends IRouteProps {}

function DevicesLayout(props: IDevicesLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const homeContext = useContext(HomeContext);
  const path = templatePath(props.path, { userHomeId: homeContext.userHomeId });
  var isBase = location.pathname === path;
  const role = auth.user ? auth.user.role : -1;
  const navPaths = getFilteredSubpaths("devices", role, ["new"]);

  useEffect(() => {}, [location.pathname, auth.user]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.nav}>
        <Typography variant="h6">Devices</Typography>
        <Stack direction="row" spacing={1}>
          {navPaths.map((_path: IPath) => {
            const linkPath = (path + "/" + _path.Base + "/");
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
        <div>All Devices</div>
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </Box>
  );
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
