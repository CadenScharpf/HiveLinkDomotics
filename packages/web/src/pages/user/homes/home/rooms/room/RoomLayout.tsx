import React, { useContext, useEffect } from 'react'
import { RoomContext } from '../RoomsLayout'
import { IRoomDetails } from 'hive-link-common';
import { LinearProgress, Typography } from '@mui/material';
import { Room } from './Room';
import { useLoaderData } from 'react-router-dom';

function RoomLayout() {
  const [roomInfo, setRoomInfo] = React.useState<Room>();
const room = useLoaderData() as Room;

  return room? (
    <div>
      <Typography color="primary" variant="h5">{room.name}</Typography>
    </div>
  ) : (<>room not found</>)
}

export default RoomLayout