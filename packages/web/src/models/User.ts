import axios from "axios";
import {
  IHomeDetails,
  INewAddress,
  INewHome,
  ISessionUser,
  user_address,
  user_device,
  user_home,
} from "hive-link-common";
import Paths from "../pages/common/constants/Paths";

export default class User implements ISessionUser {
  id: ISessionUser["id"];
  email: ISessionUser["email"];
  first_name: ISessionUser["first_name"];
  last_name: ISessionUser["last_name"];
  role: ISessionUser["role"];

  constructor(user: ISessionUser) {
    this.id = user.id;
    this.email = user.email;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.role = user.role;
  }

  getHome: (homeId: number) => Promise<IHomeDetails> = async (homeId: number) => {
    try {
      const res = await axios.get(`/api/user/homes/${homeId}`);
      return res.data.home;
    } catch (err) {
      throw err;
    }
  };

  getHomes: () => Promise<user_home[]> = async () => {
    try {
      const res = await axios.get(`/api/user/homes`);
      return res.data.homes;
    } catch (err) {
      throw err;
    }
  };
  getDevices: (homeId: number) => Promise<user_device[]> = async (homeId: number) => {
    try {
      const res = await axios.get(`/api/user/homes/${homeId}/devices`);
      return res.data.devices;
    } catch (err) {
      throw err;
    }
  };


  addHome: (home: INewHome) => Promise<user_home> = async (home: INewHome) => {
    try {
      const response = await axios.post("/api/user/homes", home);
      return response.data.home as user_home;
    } catch (err) {
      throw err;
    }
  };

  getAddresses: () => Promise<user_address[]> = async () => {
    try {
      const res = await axios.get(`/api/user/addresses`);
      return res.data.addresses;
    } catch (err) {
      throw err;
    }
  };

  addAddress: (address: INewAddress) => Promise<user_address> = async (
    address: INewAddress
  ) => {
    try {
      const response = await axios.post("/api/user/addresses", address);
      return response.data.address as user_address;
    } catch (err) {
      throw err;
    }
  }

}
