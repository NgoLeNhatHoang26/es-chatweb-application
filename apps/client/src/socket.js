import { io } from "socket.io-client";
// Khởi tạo socket nhưng chưa kết nối
const socket = io("http://localhost:3002")
export default socket;
