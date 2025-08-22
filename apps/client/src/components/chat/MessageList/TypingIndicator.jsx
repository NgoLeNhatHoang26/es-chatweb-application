import { useEffect ,useState } from "react";
import socket from "../../../socket";
import { useChatTarget } from "../../../context/ChatTargetContext";
import {Typography, Box} from "@mui/material";

export default function TypingIndicator({userId, userList}) {
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");
  const {currentChatWith} = useChatTarget();
  useEffect(() => {
    socket.on("user-typing", ({ senderId, receiverId, type, groupId }) => {
      if (type === "user") {
        // Chat 1-1
        if (receiverId === userId && senderId === currentChatWith.id) {
          setIsTyping(true);
          setTypingUser(currentChatWith.name || "User");
        }
      } else if (type === "group") {
        // Chat nhóm
        const name = userList.find(user => user.id === senderId)?.name
        if (groupId === currentChatWith.id && senderId !== userId) {
          setIsTyping(true);
          setTypingUser(name || "User"); 
        }
      }
    });
    socket.on("user-stop-typing", ({ senderId, receiverId, type, groupId }) => {
      if (type === "user") {
        if (receiverId === userId && senderId === currentChatWith.id) {
          setIsTyping(false);
          setTypingUser("");
        }
      } else if (type === "group") {
        if (groupId === currentChatWith.id && senderId !== userId) {
          setIsTyping(false);
          setTypingUser("");
        }
      }
    })
    return () => {
      socket.off("user-typing");
      socket.off("user-stop-typing");
    };
  }, [socket, userId, currentChatWith.id, userList]);
    return (
      isTyping && (
        <Box
          display={"flex"}
          justifyContent={'center'}
          alignItems={'center'}
          py={1}
          px={2}
          bgcolor={"#48cae4s"}
          border={"1px solid #000000"}
          borderRadius={6}
          width={"fit-content "}
          >
            <Typography alignSelf={"center"} variant="body1" sx={{ fontSize: "1rem", fontStyle: "italic" }}>
                <span>{typingUser} is typing...</span>
            </Typography>          
          </Box>
      )
    );
}