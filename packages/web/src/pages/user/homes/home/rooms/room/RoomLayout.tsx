import React, { useContext, useEffect } from 'react'
import { RoomContext } from '../RoomsLayout'
import { IRoomDetails } from 'hive-link-common';
import { LinearProgress } from '@mui/material';
import { Room } from './Room';
import { useLoaderData } from 'react-router-dom';

function RoomLayout() {
  const [roomInfo, setRoomInfo] = React.useState<Room>();
const room = useLoaderData() as Room;



  return room? (
    <div>
      <h1>{room.name} Dashboard</h1>
    </div>
  ) : (<>room not fount</>)
}

export default RoomLayout