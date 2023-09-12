import { useEffect } from "react";
import { IRouteProps } from "../../common/types/IRouteProps";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/auth";
import { IPath, getFilteredSubpaths } from "../../common/constants/Paths";
import { Box, IconButton, Stack, SxProps, Tooltip, Typography } from "@mui/material";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

interface IDevicesLayoutProps extends IRouteProps {
}

function DevicesLayout(props: IDevicesLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const auth = useAuth();
  const isBase = location.pathname === props.path;
  const role = auth.user ? auth.user.role : -1;
  const navPaths = getFilteredSubpaths(":id/devices", role, ["new"]);
  useEffect(() => {}, [location.pathname, auth.user]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.nav}>
      <Typography variant="h6" >
          Home {id} Devices
      </Typography>
        <Stack direction="row" spacing={1}>
          {navPaths.map((path: IPath) => {
            const linkPath = (props.path + "/" + path.Base).replace(new RegExp(":id", "g"), id ?? "-1");
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
