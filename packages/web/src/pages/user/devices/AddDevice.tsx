import React, { useEffect } from 'react'
import { IRouteProps } from '../../common/types/IRouteProps'
import { Outlet, useLocation } from 'react-router-dom';

interface IAddDeviceProps extends IRouteProps {
}

function AddDevice(props: IAddDeviceProps) {
    const location = useLocation();
    const basePath = props.path;
    var isBase = location.pathname === basePath
    useEffect(() => {isBase = location.pathname === basePath}, [location.pathname])


    return isBase? (
        <div>Add Device Page</div>
        ) : (<Outlet />)

}

export function AddPlugDevice(props: IAddDeviceProps) {
    return (
        <div>Add Plug Device</div>
    )
}

export function AddSwitchDevice( props: IAddDeviceProps) {
    return (
        <div>Add Switch Device</div>
    )
}

export function AddLightDevice( props: IAddDeviceProps) {
    return (
        <div>Add Light Device</div>
    )
}



export default AddDevice