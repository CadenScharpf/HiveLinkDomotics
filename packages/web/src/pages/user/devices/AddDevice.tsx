import React from 'react'
import { IRouteProps } from '../../common/types/IRouteProps'
import { Outlet, useLocation } from 'react-router-dom';

interface IAddDeviceProps extends IRouteProps {
}

function AddDevice(props: IAddDeviceProps) {
    const location = useLocation();
    return location.pathname === props.path? (
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


export default AddDevice