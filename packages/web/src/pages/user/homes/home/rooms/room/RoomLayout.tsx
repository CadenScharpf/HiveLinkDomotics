import React, { useContext, useEffect } from 'react'
import { RoomContext } from '../RoomsLayout'
import { IRoomDetails } from 'hive-link-common';
import { LinearProgress } from '@mui/material';
import { HomeContext } from '../../HomeLayout';
import { Room } from '../../../../../../models/Room';

function RoomLayout() {
  const roomContext = useContext(RoomContext)
  const homeContext = useContext(HomeContext)
  const [roomInfo, setRoomInfo] = React.useState<Room>();

  useEffect(() => {
    if (roomContext.roomId !== -1) {
      homeContext.home?.getRoom(roomContext.roomId)
        .then((room) => {
          setRoomInfo(new Room(room))
        })
        .catch((err) => {
          console.log(err)
        })
    }
  } 
  , [roomContext.roomId, homeContext.home])

  return roomInfo? (
    <div>
      <h1>{roomInfo.name}</h1>
    </div>
  ) : (<><LinearProgress color="primary" sx={{width: '100%'}} /></>)
}

export default RoomLayout