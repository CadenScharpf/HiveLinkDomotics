import React, { useContext } from "react";
import { Box, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useHomeData } from "../Home";

function Rooms() {
  const homeContext = useHomeData();
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Stack direction="row">
        {homeContext.user_room?.map((room) => (
          <Box
            onClick=    {() => {
              navigate("/user/homes/:userHomeId/rooms/:roomId", {
                replace: true,
                state: { roomId: room.id },
              });
            }
            }
            sx={{ border: "1px solid grey" }}
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
