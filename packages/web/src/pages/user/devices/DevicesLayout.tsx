import React from "react";
import { IPageProps } from "../../common/types/IPageProps";
import { Outlet, useLocation } from "react-router-dom";

interface IDevicesProps extends IPageProps {}

function DevicesLayout(props: IDevicesProps) {
  const location = useLocation();

  return location.pathname === props.path ? (
    <div>Devices</div>
  ) : (
    <div>
      Devices Nav
      <Outlet />
    </div>
  );
}

export default DevicesLayout;
