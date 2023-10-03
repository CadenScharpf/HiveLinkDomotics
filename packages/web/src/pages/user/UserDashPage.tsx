import {
  Box,
  Button,
  LinearProgress,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import Home from "./homes/home/Home";
import { useAuth } from "../../common/hooks/auth";
import { IHomeDetails } from "hive-link-common";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "./homes/home/HomeLayout";
import HomeDash from "./homes/home/HomeDash";

const layout = {
  sideBarWidth: 300,
};

const styles: Record<string, any> = {
  container: { width: "100%", height: "100%", display: "flex" },
  sidebar: {
    width: `${layout.sideBarWidth}px`,
    height: "100%",
    borderRight: "1px solid black",
  },
  content: {
    width: `calc(100% - ${layout.sideBarWidth}px)`,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "10px",
  },
  activeHome: { width: "80%", maxWidth: "750px", border: "1px solid grey", borderRadius: "5px", background: 'rgba(176, 176, 176, 0.4)' },
};

function UserDashPage(props: {}) {
  const [homes, setHomes] = React.useState<Home[] | null>(null);
  const [activeHomeIdx, setActiveHomeIdx] = React.useState<number | null>(null); //todo:: use this to render the home page

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const activeHome =
    homes && activeHomeIdx != null ? homes[activeHomeIdx] : null;

  React.useEffect(() => {
    if (auth.user) {
      auth.user.getHomes().then((homes: Home[]) => {
        setHomes(homes);
      });
    }
  }, [auth.user]);

  return homes ? (
    <Box sx={styles.container}>
      <Box sx={styles.sidebar}>
        <Button
          variant="text"
          onClick={() => {
            navigate(location.pathname + "/homes");
          }}
        >
          Homes {` (${homes.length})`}
        </Button>
        {homes ? (
          <List>
            {homes.map((home: Home, index) => {
              return (
                <ListItemButton
                  key={`userDashboard-homesNavLink::${home.id}`}
                  onClick={() => {
                    setActiveHomeIdx(index);
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
      <Box sx={styles.content}>
        {activeHome ? (
          <Box sx={styles.activeHome}>
            <HomeDash
              home={activeHome}
              homeRoutePath={location.pathname + "/homes/" + activeHome.id}
            />
          </Box>
        ) : (
          <Typography variant="h5">Select a home</Typography>
        )}
      </Box>
    </Box>
  ) : (
    <LinearProgress color="primary" sx={{ width: "100%" }} />
  );
}

export default UserDashPage;
