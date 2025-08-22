import { Box, IconButton} from "@mui/material";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SendIcon from '@mui/icons-material/Send';
import { useState, useRef, useEffect } from "react";
import socket from "../../../socket"; 
import axios from "axios";
import { useUser } from "../../../context/UserContext";
import { useChatTarget } from "../../../context/ChatTargetContext";
import { useMessages } from "../../../context/MessageContext";
import AttachFileButton from "./AttachFileButton";
import MessageInput from "./MessageInput";
export default function InputBar() {
  const {currentUser} = useUser()
  const {currentChatWith} = useChatTarget()
  const {setMessages} = useMessages()
  const [text, setText] = useState("");
  const [attach, setAttach] = useState(null);
  const [hideAttach,setHideAttach] = useState(false)
  const typingTimeoutRef = useRef(null);

  const conversation = [currentChatWith.id, currentUser.id]
    .sort((a, b) => a - b)
    .join('_');
  const participants = currentChatWith.type === 'user'
    ? [currentChatWith.id, currentUser.id]
    : currentChatWith.members;

  const handleFileSelect = (file) => {
    if (!file) {
      console.warn("Chưa chọn file");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Chỉ hỗ trợ file ảnh");
      return;
    }
    if (file.size > 2 * 1024 * 1024) { // > 2MB
      alert("Ảnh quá lớn, vui lòng chọn ảnh < 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setAttach(base64String);
    };
    reader.readAsDataURL(file);
  };



  const handleTyping = (e) => {
    setText(e.target.value);
    socket.emit("user-typing", {
      senderId: currentUser.id,
      receiverId: currentChatWith.id,
      type: currentChatWith.type
    });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("user-stop-typing", {
        senderId: currentUser.id,
        receiverId: currentChatWith.id,
        type: currentChatWith.type
      });
    }, 1500);
  }

  const handleSendingMessage = () => {
    if (!text && !attach) return;
    const sendTime = new Date().toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newMessage = {
      type: text.trim() ? "text" : "image",
      content: text.trim() ? text : attach,
      conversationId: conversation,
      participants: participants,
      senderId: currentUser.id,
      timeStamp: sendTime
    };
    axios.post("http://localhost:3001/messages", newMessage)
      .then(res => setMessages(prev => [...prev, res.data]))
      .catch(err => console.error(err));
    socket.emit("send-message", {
      message: newMessage,
      receiverId: currentChatWith.id,
      type: currentChatWith.type  
    });
    setText("");
    setAttach(null);
    setHideAttach(!hideAttach)
  }

  return (
    <Box
    maxHeight={"75px"}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="background.paper2"
      border="1px solid"
      borderColor="#000"
      py={1.5}
      px={{xs: 1, md: 3}}
      gap={{xs: 1, md: 4}}
    >
      <IconButton>
        <SentimentSatisfiedAltIcon />
      </IconButton>
      <AttachFileButton onFileSelect={handleFileSelect} hideAttach={hideAttach} />
      <MessageInput value={text} onChange={handleTyping} />
      <IconButton onClick={() => handleSendingMessage()}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}
