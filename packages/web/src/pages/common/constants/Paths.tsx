import React from "react";
import {
  ActionFunctionArgs,
  Link,
  Params,
  Route,
  RouteMatch,
} from "react-router-dom";
import ProtectedRoute from "../../../common/components/auth/ProtectedRoute";
import { INewHome, user, user_home } from "hive-link-common";
import Landing from "../../public/landing/Landing";
import Login from "../../public/Login";
import Register from "../../public/Register";
import UserLayout from "../../user/UserLayout";
import ProfilePage from "../../user/ProfilePage";
import HomesLayout from "../../user/homes/HomesLayout";
import HomeLayout from "../../user/homes/home/HomeLayout";
import NewHomePage from "../../user/homes/NewHomePage";
import DevicesLayout from "../../user/homes/home/devices/DevicesLayout";
import AddDevice, {
  AddLightDevice,
  AddPlugDevice,
  AddSwitchDevice,
} from "../../user/homes/home/devices/AddDevice";
import Routines from "../../user/routines/Routines";
import Plugs from "../../user/homes/home/devices/device/SmartPlug/Plugs";
import Switches from "../../user/homes/home/devices/device/SmartSwitch/Switches";
import Lights from "../../user/homes/home/devices/device/SmartLight/Lights";
import Products from "../../public/Products";
import RoomsLayout from "../../user/homes/home/rooms/RoomsLayout";
import RoomLayout from "../../user/homes/home/rooms/room/RoomLayout";
import axios from "axios";
import { homedir } from "os";
import Home from "../../user/homes/home/Home";
import { Room } from "../../user/homes/home/rooms/room/RoomModel";
import NewRoomPage from "../../user/homes/home/rooms/NewRoom";
import RoomDevices from "../../user/homes/home/rooms/room/RoomDevices";

export interface IPathConfig {
  Base: string;
  Title?: string;
  Roles: number[];
  Component: React.ComponentType<{ path: string }>;
  Loader?: (params: Params) => Promise<any>;
  Crumb?: (data: any) => string;
  ShouldRevalidate?(params: any): boolean;
  Subpaths: IPathConfig[];
}

export interface IPath extends IPathConfig {
  Location: string;
  Loader: (params: Params) => Promise<any>;
  Subpaths: IPath[];
}

const pathConfig: IPathConfig = {
  Base: "/",
  Roles: [],
  Component: Landing, // Use the component type, not an instance
  Subpaths: [
    {
      Base: "login",
      Roles: [],
      Component: Login, // Use the component type, not an instance
      Subpaths: [],
    },
    {
      Base: "register",
      Roles: [],
      Component: Register, // Use the component type, not an instance
      Subpaths: [],
    },
    {
      Base: "user",
      Title: "HiveLink App",
      Roles: [0, 1],
      Component: UserLayout,
      Crumb: (data: any) => "HiveLink",
      
      Subpaths: [
        {
          Base: "profile",
          Roles: [0, 1],
          Component: ProfilePage,
          Subpaths: [],
        },
        {
          Base: "homes",
          Title: "My Homes",
          Roles: [0, 1],
          Component: HomesLayout,
          Crumb: (data: any) => "My Homes",
          Loader: async (params: Params) => {
            return Home.getHomes();
          },
          ShouldRevalidate: ({ currentUrl }) => {
            return true;
          },
          Subpaths: [
            {
              Base: ":userHomeId",
              Title: "Home Dashboard",
              Roles: [0, 1],
              Component: HomeLayout,
              Loader: async (params: Params) =>
                params.userHomeId ? Home.getHome(params.userHomeId) : null,
              Crumb: (data: Home) => data.name,
              ShouldRevalidate: ({ currentUrl }) => {
                return true;
              },
              Subpaths: [
                {
                  Base: "rooms",
                  Title: "Rooms",
                  Roles: [0, 1],
                  Crumb: (data: any) => "Rooms",
                  Component: RoomsLayout,

                  Subpaths: [
                    {
                      Base: ":roomId",
                      Title: "Room",
                      Roles: [0, 1],
                      Component: RoomLayout,
                      Loader: async (params: Params) =>
                        params.roomId && params.userHomeId
                          ? Room.getRoom(params.roomId, params.userHomeId)
                          : null,
                      Crumb: (data: Room) => data.name,
                      Subpaths: [
                        {
                          Base: "devices",
                          Title: "Devices",
                          Roles: [0, 1],
                          Component: RoomDevices,
                          Loader: async (params: Params) =>
                        params.roomId && params.userHomeId
                          ? Room.getDevices(params.roomId, params.userHomeId)
                          : null,
                          Subpaths: [
                            {
                              Base: "new",
                              Roles: [0, 1],
                              Component: AddDevice,
                              Subpaths: [
                                {
                                  Base: "plug",
                                  Roles: [0, 1],
                                  Component: AddPlugDevice,
                                  Subpaths: [],
                                },
                                {
                                  Base: "switch",
                                  Roles: [0, 1],
                                  Component: AddSwitchDevice,
                                  Subpaths: [],
                                },
                                {
                                  Base: "light",
                                  Roles: [0, 1],
                                  Component: AddLightDevice,
                                  Subpaths: [],
                                },
                              ],
                            },
                            {
                              Base: "plugs",
                              Roles: [0, 1],
                              Component: Plugs,
                              Subpaths: [],
                            },
                            {
                              Base: "switches",
                              Roles: [0, 1],
                              Component: Switches,
                              Subpaths: [],
                            },
                            {
                              Base: "lights",
                              Roles: [0, 1],
                              Component: Lights,
                              Subpaths: [],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      Base: "new",
                      Roles: [0, 1],
                      Component: NewRoomPage,
                      Crumb: (data: any) => "New Room",
                      Subpaths: [],
                    },
                  ],
                },
                {
                  Base: "routines",
                  Title: "Routines",
                  Roles: [0, 1],
                  Component: Routines,
                  Subpaths: [],
                },
              ],
            },
            {
              Base: "new",
              Roles: [0, 1],
              Component: NewHomePage,
              Crumb: (data: any) => "New Home",
              Subpaths: [],
            },
          ],
        },
      ],
    },
    {
      Base: "products",
      Roles: [],
      Component: Products,
      Subpaths: [],
    },
  ],
};

const Paths = exportPaths(pathConfig, "");

//Utility Functions

function exportPaths(pathConfig: IPathConfig, parentLoc: string): IPath {
  const path: IPath = {
    Base: pathConfig.Base,
    Location: parentLoc + pathConfig.Base,
    Roles: pathConfig.Roles,
    Component: pathConfig.Component,
    Crumb: pathConfig.Crumb,
    Loader: pathConfig.Loader
      ? pathConfig.Loader
      : async (params: Params) => {
          return null;
        },

    Subpaths: [],
  };
  path.Subpaths = pathConfig.Subpaths.map((subPath) => {
    return exportPaths(subPath, path.Location);
  });
  return path;
}

export function getPathObject(base: string): IPath | null {
  return getPathObjectAcc(base, Paths);
}
function getPathObjectAcc(base: string, path: IPath): IPath | null {
  if (path.Base === base) {
    return path;
  }

  for (const subpath of path.Subpaths) {
    const res = getPathObjectAcc(base, subpath);
    if (res) {
      return res;
    }
  }
  return null; // Return null if the path is not found
}

/*
 * Returns the subpaths of a path that are accessible to a user with a given role
 * @param base: the base path to get the subpaths of
 * @param role: the role of the user
 * @param exclude: the paths to exclude from the returned list
 */
export function getFilteredSubpaths(
  base: string,
  role: user["role"],
  exclude: string[]
): IPath[] {
  const path = getPathObject(base);
  if (!path) {
    return [];
  }
  return path.Subpaths.filter((path: IPath) => {
    return (
      (path.Roles.length === 0 || path.Roles.includes(role)) &&
      !exclude.includes(path.Base)
    );
  });
}

export const getPathRoutes = (
  path: IPath,
  parentRoute: string,
  protect?: boolean
): React.ReactElement => {
  const absPath = parentRoute + path.Base;
  const Component = path.Component; // Get the component type
  return (
    <Route
      path={path.Base}
      key={absPath + " route"}
      loader={({ params }) => path.Loader(params)}
      handle={{ crumb: path.Crumb }}
      shouldRevalidate={path.ShouldRevalidate}
      element={
        <ProtectedRoute key={absPath + " component"} roles={path.Roles}>
          {/* Instantiate the component here */}
          <Component path={absPath} />
        </ProtectedRoute>
      }
    >
      {path.Subpaths.map((subpath) => getPathRoutes(subpath, absPath + "/"))}
    </Route>
  );
};

export function templatePath(
  path: string,
  params: Record<string, string  >
): string {
  let newPath = path;
  for (const [key, value] of Object.entries(params)) {
    newPath = newPath.replace(`:${key}`, value);
  }
  return newPath;
}

export default Paths as IPath;
