import React from 'react'
import { IRouteProps } from '../../common/types/IRouteProps'
import { useAuth } from '../../../hooks/auth';

function HomesDashboard(props: IRouteProps) {
  const auth = useAuth();
  


  return (
    <div>Homes Dashboard</div>
  )
}

export default HomesDashboard