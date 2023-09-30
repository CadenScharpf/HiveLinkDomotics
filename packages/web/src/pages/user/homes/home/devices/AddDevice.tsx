import React, { useContext, useEffect } from 'react'
import { IRouteProps } from '../../../../common/types/IRouteProps'
import { Outlet, useLocation } from 'react-router-dom';
import { useHomeData } from '../Home';
interface IAddDeviceProps extends IRouteProps {
}

function AddDevice(props: IAddDeviceProps) {
    const location = useLocation();
    const basePath = props.path;
    const homeContext = useHomeData();
    var isBase = location.pathname === basePath.replace(
        new RegExp("/:userHomeId", "g"),
        homeContext.id ? `/${homeContext.id}` : ""
      );


    return isBase? (
        <div>Add Device Page</div>
        ) : (<><Outlet /></>)

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