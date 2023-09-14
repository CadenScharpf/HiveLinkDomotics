import React from 'react'
import { IRouteProps } from '../../common/types/IRouteProps'
import { useAuth } from '../../../hooks/auth';
import { user_home } from 'hive-link-common';
import { useLocation } from 'react-router-dom';

function Homes(props: IRouteProps) {
  const auth = useAuth();
  const [homes, setHomes] = React.useState<user_home[]>([]);
  const location = useLocation();
  
  React.useEffect(() => {
    if (auth.user) {
      auth.user.getHomes().then((homes) => {
        setHomes(homes);
      });
    }
  }, [auth.user]);

  

  return (
    <div>Homes {location.pathname}</div>
  )
}

export default Homes