import io from "socket.io-client";
let socket = io(process.env.REACT_APP_SOCKET_APP);
export default socket;
