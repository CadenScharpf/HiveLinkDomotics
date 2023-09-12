import React, { useEffect } from "react";
import { IRouteProps } from "../../common/types/IRouteProps";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth";
import { IPath, getFilteredSubpaths } from "../../common/constants/Paths";
import { Box, IconButton, Stack, SxProps, Tooltip, Typography } from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

function DevicesLayout(props: IRouteProps) {
  const location = useLocation();
  const auth = useAuth();
  const navigate = useNavigate();

  var isBase = location.pathname === props.path;

  useEffect(() => {
    isBase = location.pathname === props.path;
  }, [location.pathname]);
  const navPaths = getFilteredSubpaths(
    "devices",
    auth.user ? auth.user.role : -1,
    ["new"]
  );

  return (
    <Box sx={styles.container}>
      <Box sx={styles.nav}>
        <Tooltip title={isBase ? "Global Filters" : "All Devices"}>
          {props.path === location.pathname ? (
            <FilterListIcon />
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
        <p>dsfsadf</p>
      </Box>
      {location.pathname === props.path ? (
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
    maxWidth: 1500,
    height: "100%",
    background: " 	#71797E",
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
