import React, { useContext } from "react";
import { IRouteProps } from "../../../../common/types/IRouteProps";
import { HomesContext } from "../../HomesLayout";
import { templatePath } from "../../../../common/constants/Paths";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Rooms from "./Rooms";
import { Box, Stack } from "@mui/material";
import { HomeContext } from "../HomeLayout";
export const RoomContext = React.createContext({ roomId: -1 });
function RoomsLayout(props: IRouteProps) {
  const homesContext = useContext(HomesContext);
  const homeContext = useContext(HomeContext);
  const basePath = templatePath(props.path, {
    userHomeId: homesContext.userHomeId.toString(),
  });
  const location = useLocation();
  const { roomId } = useParams();
  const navigate = useNavigate();

  return basePath === location.pathname ? (
    //<Rooms/>
    <Box sx={{ width: "100%", height: "100%" }}>
      <Stack direction="row" spacing={3}>
        {homeContext.home?.user_room?.map((room) => (
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
      <Outlet />
    </RoomContext.Provider>
  );
}

export default RoomsLayout;
