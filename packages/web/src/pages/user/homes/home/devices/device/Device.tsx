import { Box, Typography } from '@mui/material';
import { user_device } from 'hive-link-common';
import React from 'react'
type deviceCategory = 'light' | 'switch' | 'plug';

interface IDeviceProps {
    deviceInfo: user_device
    children?: React.ReactNode
}

function UserDevice(props: IDeviceProps) {
  return (
    <Box>
      <Typography variant="h6">{props.deviceInfo.name}</Typography>
      <Typography variant="body1">Status: online</Typography>
      {props.children}
    </Box>
  )
}

interface IRelayDeviceProps extends IDeviceProps {
  type: string;
}

function RelayDevice(props: IRelayDeviceProps) {
  return (
    <UserDevice deviceInfo={props.deviceInfo}>
      <Typography variant="body1">type: {props.type}</Typography>
    </UserDevice>
  )
}

export default UserDevice