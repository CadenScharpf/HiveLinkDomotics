import { Box } from '@mui/material'
import { user_device } from 'hive-link-common'
import React from 'react'
import UserDevice from './device/Device'

function DevicesDashboard(props: {devices: user_device[]}) {
  return (
    <Box>
        {props.devices.map((device) => {
            return (
                <UserDevice deviceInfo={device} key={device.device_id}>
                    
                </UserDevice>
            )
        }
        )}
    </Box>
  )
}

export default DevicesDashboard