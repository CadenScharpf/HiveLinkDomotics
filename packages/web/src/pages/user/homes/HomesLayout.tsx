import React, { createContext, useContext } from "react";
import { IRouteProps } from "../../common/types/IRouteProps";
import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
  useRevalidator,
} from "react-router-dom";
import { useAuth } from "../../../common/hooks/auth";
import { getFilteredSubpaths } from "../../common/constants/Paths";
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import _ from "lodash";
import Home from "./home/Home";
import AddIcon from "@mui/icons-material/Add";

function HomesLayout(props: IRouteProps) {
  const location = useLocation();
  const auth = useAuth();
  const isBase = location.pathname === props.path;
  const navigate = useNavigate();
  //const [homes, setHomes] = React.useState<Home[] | null>(null);
  const homes = useLoaderData() as Home[];

  return homes ? (
    <Box id="homes-layout-container" sx={styles.container}>
      <Box id="homes-layout-sidebar" sx={styles.sidebar}>
        {homes ? (
          <List sx={{ maxHeight: "100%", overflow: "scroll" }}>
            <Typography variant="body1" sx={{marginLeft: 1,px:0}}>{auth.user?.first_name} {auth.user?.last_name}</Typography>
            <Box
              component="span"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                variant="text"
                onClick={() => {
                  navigate(props.path);
                }}
              >
                Homes {` (${homes.length})`}
              </Button>

              <Tooltip title={"Add Home"}>
                <IconButton
                  sx={{
                    height: "25px",
                    width: "40px",
                    borderRadius: "10%",
                    background: "#2ea043",
                    marginRight: "5px",
                  }}
                  onClick={() => navigate(props.path + "/new")}
                >
                  <AddIcon sx={{ color: "white", p: 0 }} />{" "}
                </IconButton>
              </Tooltip>
            </Box>
            {homes.map((home: Home, index) => {
              return (
                <ListItemButton
                  key={`userDashboard-homesNavLink::${home.id}`}
                  onClick={() => {
                    navigate(props.path + "/" + home.id);
                  }}
                >
                  <ListItemText primary={home.name} />
                </ListItemButton>
              );
            })}
          </List>
        ) : (
          <h5>Nothing to show</h5>
        )}
      </Box>
      <Box id="homes-layout-content" sx={styles.content}>
        {isBase ? <h3>Please select a home</h3> : <Outlet />}
      </Box>
    </Box>
  ) : (
    <LinearProgress color="primary" sx={{ width: "100%" }} />
  );
}
const layout = {
  navHeight: 40,
  color1: "black",
  color1p5: "#535353",
  color2: "white",
  sideBarWidth: 250,
};

const styles: Record<string, any> = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    padding: 0,
    maxHeight: "100%",
  },

  sidebar: {
    width: `${layout.sideBarWidth}px`,
    height: "100%",

    borderRight: "1px solid grey",
    overfolw: "scroll",
  },

  content: {
    width: `calc(100% - ${layout.sideBarWidth}px)`,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "0",
  },
};

export default HomesLayout;
