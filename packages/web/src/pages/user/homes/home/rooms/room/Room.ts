import { IRoomDetails } from "hive-link-common";
import { IUserDeviceDetails } from "hive-link-common/src/user/IUserDevice";
import Paths, { templatePath } from "../../../../../common/constants/Paths";
import axios from "axios";

export class Room implements IRoomDetails {
  id: IRoomDetails["id"];
  home_id: IRoomDetails["home_id"];
  name: IRoomDetails["name"];
  created_at: IRoomDetails["created_at"];
  updated_at: IRoomDetails["updated_at"];
  user_device: IUserDeviceDetails[];
  user_id: number;

  constructor(room: IRoomDetails) {
    this.id = room.id;
    this.home_id = room.home_id;
    this.name = room.name;
    this.created_at = room.created_at;
    this.updated_at = room.updated_at;
    this.user_device = room.user_device?? [];
    this.user_id = room.user_id;
  }

  static getRoom: (roomId: number | string, userHomeId:  | string) => Promise<IRoomDetails> = async (roomId: number | string, userHomeId:  | string) => {
    try {
      const res = await axios.get(`/api/user/homes/${userHomeId}/rooms/${roomId}`);
      return new Room(res.data.room);
    } catch (err) {
      throw err;
    }
  }

}