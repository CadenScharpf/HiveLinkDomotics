import React from "react";
import Login from "../../public/Login";
import Profile from "../../user/Profile";
import Landing from "../../public/Landing";
import Register from "../../public/Register";
import UserLayout from "../../user/UserLayout";
import { Route } from "react-router-dom";
import ProtectedRoute from "../../../components/ProtectedRoute";
import Products from "../../public/Products";
import DevicesLayout from "../../user/devices/DevicesLayout";
import AddDevice, { AddPlugDevice, AddSwitchDevice } from "../../user/devices/AddDevice";
/* Roles: 
- -1: public
-  0: user
-  1: admin 
*/

export interface IPath {
  Base: string;
  Title? : string;
  Roles: number[];
  Component: React.ReactElement;
  Subpaths: IPath[];
}

const Paths: IPath = {
  Base: "/",
  Roles: [],
  Component: <Landing />, // should redirect to user dashboard if logged in
  Subpaths: [
    {
      Base: "login",
      Roles: [],
      Component: <Login />,
      Subpaths: [],
    },
    {
      Base: "register",
      Roles: [],
      Component: <Register />,
      Subpaths: [],
    },
    {
      Base: "products",
      Roles: [],
      Component: <Products path="" /> ,
      Subpaths: [],
    },
    {
      Base: "user",
      Title: "Home",
      Roles: [0, 1],
      Component: <UserLayout path="" />,
      Subpaths: [
        {
          Base: "profile",
          Roles: [0, 1],
          Component: <Profile />,
          Subpaths: [],
        },
        {
          Base: "devices",
          Roles: [0, 1],
          Component: <DevicesLayout path=""/>,
          Subpaths: [
            {
              Base: "add",
              Roles: [0, 1],
              Component: <AddDevice path=""/>,
              Subpaths: [
                {
                  Base: "plug",
                  Roles: [0, 1],
                  Component: <AddPlugDevice path=""/>,
                  Subpaths: [],
                },
                {
                  Base: "switch",
                  Roles: [0, 1],
                  Component: <AddSwitchDevice path=""/>,
                  Subpaths: []
                }
              ]
            }
          ],
        }
      ],
    },
  ],
};

export const getPathRoutes = (
  path: IPath,
  parentRoute: string,
  protect?: boolean
): React.ReactElement => {
  const absPath = parentRoute + path.Base;
  return (
    <Route
      path={path.Base}
      key={absPath + " route"}
      element={
        protect ? (
          <ProtectedRoute key={absPath + " component"} roles={path.Roles}>
            {React.cloneElement(path.Component, { path: absPath })}
          </ProtectedRoute>
        ) : (
          React.cloneElement(path.Component, { path: absPath })

        )
      }
    >
      {path.Subpaths.map((subpath) => getPathRoutes(subpath, absPath + "/"))}
    </Route>
  );
};

export default Paths;
