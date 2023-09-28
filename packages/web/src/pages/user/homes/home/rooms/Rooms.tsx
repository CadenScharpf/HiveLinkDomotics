import React, { useContext } from "react";
import { HomeContext } from "../HomeLayout";
import { Box, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function Rooms() {
  const homeContext = useContext(HomeContext);
  const rooms = homeContext.home?.user_room ?? [];
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Stack direction="row">
        {homeContext.home?.user_room?.map((room) => (
          <Box
            onClick=    {() => {
              navigate("/user/homes/:userHomeId/rooms/:roomId", {
                replace: true,
                state: { roomId: room.id },
              });
            }
            }
            sx={{ border: "1px solid black" }}
            key={"rooms-select-item::room-id:" + room.id}
          >
            {room.name}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default Rooms;
