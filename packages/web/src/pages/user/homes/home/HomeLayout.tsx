import { IRoute } from 'express'
import React, { useContext } from 'react'
import { IRouteProps } from '../../../common/types/IRouteProps'
import { HomeContext } from '../HomesLayout'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/auth';
import { getFilteredSubpaths } from '../../../common/constants/Paths';

function HomeLayout(props: IRouteProps) {
  const location = useLocation();
  const auth = useAuth();
  const isBase = location.pathname === props.path;
  const navigate = useNavigate();
  
  const navPaths = getFilteredSubpaths(
    "homes",
    auth.user ? auth.user.role : -1,
    [":home_id", "new"]
  );
  const homeContext = useContext(HomeContext)
  return isBase? (
    <div>
    <h1>Home {homeContext.homeId}</h1>
  </div>
  ): (<Outlet />)
}

export default HomeLayout