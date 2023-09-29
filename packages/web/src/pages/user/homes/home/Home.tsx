import axios from "axios";
import { IHomeDetails, IRoomDetails, user_room } from "hive-link-common";
import React, { useContext, useState } from "react";

const HomeContext = React.createContext<Home | null>(null);

export function UserHomeProvider({ children, home }: { children: React.ReactNode; home: Home }) {
  const [homeData, setHomeData] = useState<Home>(home);

  return (
    <HomeContext.Provider value={homeData}>
      {children}
    </HomeContext.Provider>
  );
}

export function useHomeData() {
  const homeContext = useContext(HomeContext);
  if (!homeContext) {
    throw new Error("useHomeData must be used within a HomeProvider");
  }
  return homeContext;
}


export default class Home implements IHomeDetails {
  id: IHomeDetails["id"];
  user_id: IHomeDetails["user_id"];
  address_id: IHomeDetails["address_id"];
  name: IHomeDetails["name"];
  address: IHomeDetails["user_address"];
  rooms: IHomeDetails["user_room"];

  user_room: IRoomDetails[];
  user_address: IHomeDetails["user_address"];
  created_at: Date;
  updated_at: Date;

  constructor(home: IHomeDetails) {
    this.id = home.id;
    this.user_id = home.user_id;
    this.address_id = home.address_id;
    this.name = home.name;
    this.address = home.user_address;
    this.rooms = home.user_room;
    this.user_room = home.user_room;
    this.user_address = home.user_address;
    this.created_at = home.created_at;
    this.updated_at = home.updated_at;
  }

  static getHome: (homeId: number | string) => Promise<IHomeDetails> = async (homeId: number | string) => {
    try {
      const res = await axios.get(`/api/user/homes/${homeId}`);
      return new Home(res.data.home);
    } catch (err) {
      throw err;
    }
  };
  
  getRoom: (roomId: number) => Promise<IRoomDetails> =  async (roomId: number) => {
    try {
      const res = await axios.get(`/api/user/homes/${this.id}/rooms/${roomId}`);
      return res.data.room;
    } catch (err) {
      throw err;
    }
  };

  getRooms: () => Promise<user_room[]> = async () => {
    try {
      const res = await axios.get(`/api/user/homes/${this.id}/rooms`);
      return res.data.rooms;
    } catch (err) {
      throw err;
    }
  };
}


