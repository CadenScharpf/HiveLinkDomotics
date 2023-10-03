import React from 'react'
import { useHomeData } from '../Home';
import { Box, SxProps, Typography } from '@mui/material';
import { user_room } from 'hive-link-common';
import { useNavigate } from 'react-router-dom';

function Rooms(props: {basePath: string}) {
    const homeContext = useHomeData();
    const navigate = useNavigate();
  return (
    <>
    {homeContext && homeContext.user_room?.length === 0 ? (
            <Box sx={styles.containter}>
              <Typography variant="h5">No Rooms found</Typography>
            </Box>
          ) : (
            homeContext &&
            homeContext.user_room?.map((room: user_room) => (
              <Box
                onClick={() => {
                  navigate(props.basePath + "/" + room.id);
                }}
                sx={{ border: "1px solid black" }}
                key={"rooms-select-item::room-id:" + room.id}
              >
                {room.name}
              </Box>
            ))
          )}
    </>
  )
}
const styles: Record<string, SxProps> = {
    containter: { width: "100%", display: "flex", justifyContent: "center" },
  };

export default Rooms