import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { IPageProps } from '../common/types/IPageProps'

interface IUserLayoutProps extends IPageProps {

}
function UserLayout(props : IUserLayoutProps) {
  const location = useLocation();
  return location.pathname  === props.path ? (
    <div>user dashboard</div>
  ) : (
    <Outlet />
  )
}


export default UserLayout