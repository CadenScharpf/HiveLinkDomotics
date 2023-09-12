import { useEffect } from "react";
import { IRouteProps } from "../../common/types/IRouteProps";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth";
import { IPath, getFilteredSubpaths } from "../../common/constants/Paths";
import { Box, IconButton, Stack, SxProps, Tooltip } from "@mui/material";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

function DevicesLayout(props: IRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const isBase = location.pathname === props.path;
  const role = auth.user ? auth.user.role : -1;

  useEffect(() => {}, [location.pathname, auth.user]);
  const navPaths = getFilteredSubpaths("devices", role, ["new"]);
  return (
    <Box sx={styles.container}>
      <Box sx={styles.nav}>
        <Tooltip title={isBase ? "Global Filters" : "All Devices"}>
          {isBase ? (
            <IconButton onClick={() => navigate(props.path)}>
              <FilterListIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => navigate(props.path)}>
              <FilterListOffIcon />
            </IconButton>
          )}
        </Tooltip>
        <Stack direction="row" spacing={1}>
          {navPaths.map((path: IPath) => {
            return (
              <Link
                key={props.path + path.Base + "::nav_item_key"}
                to={props.path + "/" + path.Base}
              >
                {path.Title ||
                  path.Base.charAt(0).toUpperCase() + path.Base.slice(1)}
              </Link>
            );
          })}
        </Stack>
        <Stack direction="row" spacing={1}>
          <Tooltip title={"Add Device"}>
            <IconButton onClick={() => navigate(props.path + "/new")}>
              <AddToQueueIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
      {isBase ? (
        <div>Devices</div>
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
