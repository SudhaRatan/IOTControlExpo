import io from "socket.io-client";
import { API_URL } from "../src/constants/env";

const socket = io(API_URL, {
  autoConnect: false,
});

export default socket;
