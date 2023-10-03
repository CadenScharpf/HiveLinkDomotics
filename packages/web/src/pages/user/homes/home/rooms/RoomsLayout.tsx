import React, { useContext } from "react";
import { IRouteProps } from "../../../../common/types/IRouteProps";
import { templatePath } from "../../../../common/constants/Paths";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  IconButton,
  Stack,
  SxProps,
  Tooltip,
  Typography,
} from "@mui/material";
import { useHomeData } from "../Home";
import { user_room } from "hive-link-common";
import AddIcon from "@mui/icons-material/Add";
import NewRoomPage from "./NewRoom";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from '@mui/icons-material/Cancel';
import Rooms from "./Rooms";

export const RoomContext = React.createContext({ roomId: -1 });

function RoomsLayout(props: IRouteProps) {
  const homeContext = useHomeData();
  const basePath = templatePath(props.path, {
    userHomeId: homeContext ? homeContext.id.toString() : "-1",
  });
  const location = useLocation();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [showNewRoomForm, setShowNewRoomForm] = React.useState(false);

  const layout = {
    navHeight: 40,
  };

  const styles: Record<string, SxProps> = {
    container: {  width: "100%", height: "100%" },
    content: { height: `calc(100% - ${layout.navHeight}px)`, display: 'flex', flexDirection: 'column', alignItems: "center" }
  };
  
  return basePath === location.pathname ? (
    //<Rooms/>
    <Box sx={{ ...styles.container}}>
      <Box
        sx={{
          height: `${layout.navHeight}px`,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Stack direction="row" sx={{}}>
          {showNewRoomForm ? (
            <>
              <NewRoomPage />
              <IconButton sx={{height: '100%'}} onClick={() => {setShowNewRoomForm(false)}}>
                <CancelIcon sx={{color: 'red'}}/>
              </IconButton>
            </>
          ) : (
            <Tooltip title={"Add Room"}>
              <Box
                onClick={() => {
                  setShowNewRoomForm(true);
                }}
                sx={{ color: "green" }}
              >
                <AddIcon />
              </Box>
            </Tooltip>
          )}
        </Stack>
      </Box>
      <Box sx={styles.content}>
        <Typography variant="h5">Rooms</Typography>
        <Stack direction="row" spacing={3}>
          <Rooms basePath={basePath}/>
        </Stack>
      </Box>
    </Box>
  ) : (
    <RoomContext.Provider value={{ roomId: parseInt(roomId ?? "-1") }}>
      <Outlet />
    </RoomContext.Provider>
  );
  
}

export default RoomsLayout;
