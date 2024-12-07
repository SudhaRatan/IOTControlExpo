import { API_URL } from "@/src/constants/Consts";
import axios from "../axios";

export const getDevices = async (setDevices:any, setLoadingDevices: any) => {
  try {
    setLoadingDevices(true)
    const result = await axios.get(API_URL + "/things");
    setLoadingDevices(false)
    setDevices(result.data)
  } catch (error) {
    setLoadingDevices(false)
    console.log(error);
    throw error;
  }
};
