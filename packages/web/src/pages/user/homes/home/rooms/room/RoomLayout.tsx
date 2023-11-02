import React, { useContext, useEffect } from "react";
import { RoomContext } from "../RoomsLayout";
import { IRoomDetails } from "hive-link-common";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { Room } from "./RoomModel";
import { Link, Outlet, useLoaderData, useLocation, useParams } from "react-router-dom";
import { templatePath } from "../../../../../common/constants/Paths";
import { IRouteProps } from "../../../../../common/types/IRouteProps";



function RoomLayout(props: IRouteProps) {
  const [roomInfo, setRoomInfo] = React.useState<Room>();
  const room = useLoaderData() as Room;
  const location = useLocation();
  const params = { ...useParams() } as Record<string, string>;
  const pathWithParams = templatePath(props.path, params);
  console.log(location.pathname)
  console.log(pathWithParams)

  if(location.pathname === pathWithParams) {return (
    <Box sx={{display: "flex", justifyContent: 'center', width: '100%'}}>
      <Typography color="primary" variant="h5">
        {room.name}
        <Stack direction="row">
          <Link to={pathWithParams+`/devices`}>
            Devices
          </Link>
          <Link to={pathWithParams+`/`}>
            Devices
          </Link>
        </Stack>
      </Typography>
  </Box>
  )
  } else {
    return <Outlet />
  }
}

export default RoomLayout;
