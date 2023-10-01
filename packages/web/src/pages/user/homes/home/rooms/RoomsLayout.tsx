import React, { useContext } from "react";
import { IRouteProps } from "../../../../common/types/IRouteProps";
import { templatePath } from "../../../../common/constants/Paths";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { useHomeData } from "../Home";
import { user_room } from "hive-link-common";

export const RoomContext = React.createContext({ roomId: -1 });

function RoomsLayout(props: IRouteProps) {
  const homeContext = useHomeData();
  const basePath = templatePath(props.path, {
    userHomeId: homeContext? homeContext.id.toString() : "-1",
  });
  const location = useLocation();
  const { roomId } = useParams();
  const navigate = useNavigate();

  return basePath === location.pathname ? (
    //<Rooms/>
    <Box sx={{ width: "100%", height: "100%" }}>
      <Stack direction="row" spacing={3}>
        {homeContext && homeContext.user_room?.map((room: user_room) => (
          <Box
            onClick={() => {
              navigate(basePath + "/" + room.id);
            }}
            sx={{ border: "1px solid black" }}
            key={"rooms-select-item::room-id:" + room.id}
          >
            {room.name}
          </Box>
        ))}
      </Stack>
    </Box>
  ) : (
    <RoomContext.Provider value={{ roomId: parseInt(roomId ?? "-1") }}>
      sdfas
      <Outlet />
    </RoomContext.Provider>
  );
}

export default RoomsLayout;
