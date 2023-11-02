import {
  Box,
  Button,
  IconButton,
  Link,
  SxProps,
  Typography,
} from "@mui/material";
import { stubArray } from "lodash";
import React from "react";
import Home from "./Home";
import { useLocation, useNavigate } from "react-router-dom";
import { homedir } from "os";
import EditIcon from "@mui/icons-material/Edit";

const styles: Record<string, SxProps> = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    p: 2,
    /*         alignItems: 'center', */
  },
  sublist: {
    paddingLeft: 2,
    display: "flex",
    flexDirection: "column",
  },
};

function HomeDetails(props: { home: Home; homeRoutePath: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isBase = location.pathname === props.homeRoutePath;
  const { home, homeRoutePath } = props;
  return (
    <Box sx={styles.container}>
      {props.home.address && (
        <>
          <Typography variant="body1">
            {props.home.address.address_line1},{" "}
            {props.home.address.address_line2}
          </Typography>
          <Typography variant="body1">
            {props.home.address.city}, {props.home.address.country}{" "}
            {props.home.address.postal_code}
          </Typography>
        </>
      )}

      <Typography
        sx={{}}
        variant="h6"
        color="primary"
        component={Link}
        onClick={() => {
          navigate(props.homeRoutePath + "/rooms");
        }}
      >
        Rooms ({`${home.rooms.length}`})
      </Typography>
      <Box sx={{ ...styles.sublist }}>
        {home.rooms.map((room) => {
          const roomPath = props.homeRoutePath + "/rooms/" + room.id;
          return (
            <Box key={"roomDetails::" + room.id}>
              <Typography
                variant="body1"
                component={Link}
                onClick={() => {
                  navigate(roomPath);
                }}
              >
                {room.name}
              </Typography>
              <Box sx={{ ...styles.sublist }}>
                {room.user_device && (
                  <>
                    <Typography
                      variant="body1"
                      component={Link}
                      onClick={() => {
                        navigate(roomPath + "/devices");
                      }}
                    >
                      Devices ({`${room.user_device?.length}`})
                    </Typography>
                    <Box sx={{ ...styles.sublist }}>
                      {room.user_device.map((device) => {
                        const devicePath = roomPath + "/devices/" + device.id;
                        return (
                          <Typography
                            key={device.id}
                            variant="body1"
                            component={Link}
                            onClick={() => {
                              navigate(devicePath);
                            }}
                          >
                            {device.name}
                          </Typography>
                        );
                      })}
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default HomeDetails;
