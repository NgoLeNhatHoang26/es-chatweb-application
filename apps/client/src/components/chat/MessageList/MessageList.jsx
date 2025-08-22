import { Box, Stack} from "@mui/material";
import React, { useState, useEffect, useMemo, useLayoutEffect } from "react";
import MessageBox from "./MessageBox";
import socket from "../../../socket"
import { useUser } from "../../../context/UserContext";
import { useMessages } from "../../../context/MessageContext";
import { fetchUsers } from "../../../services/userService";
import { useChatTarget } from "../../../context/ChatTargetContext";
import { fetchMessages } from "../../../services/messagesService";
import TypingIndicator from "./TypingIndicator";
function MessageList() {

    const {currentUser} = useUser()
    const { messagesRefs} = useMessages()
    const [users, setUsers] = useState([])
    const {currentChatWith} = useChatTarget()
    const {messages,setMessages} = useMessages()
    const conversation = useMemo(() => [currentChatWith.id, currentUser.id].sort((a,b) => a - b).join('_'), [currentChatWith,currentUser])
    const participants = useMemo(() => (currentChatWith.type === 'user' ? [currentChatWith.id, currentUser.id] : (currentChatWith.members)), [currentChatWith,currentUser])
    useEffect(() => {
        fetchUsers().then(data => setUsers(data))
    },[])
    // Lấy dữ liệu từ json-server có người nhận là userId được truyền vào
    useLayoutEffect(() => {
        if (!currentChatWith) return;
        if (currentChatWith.type === "group") {
            // Lấy tất cả message rồi lọc nhóm có user hiện tại
            fetchMessages()
            .then(data => {
                const filteredMessages = data.filter(message =>
                Array.isArray(message.participants) &&   // Xđ là tin nhắn giữa ít nhất 2 đối tượng
                message.participants.length > 2 &&       // Tin nhắn thuộc về 1 nhớm
                message.participants[participants.length-2] === currentChatWith.id &&  // Xác định nhóm hiện tại 
                message.participants.includes(String(currentUser.id))   // người dùng là 1 thành viên của nhóm
                );
                setMessages(filteredMessages);
            })
        } else {
            // Lấy message theo conversationId với user chat riêng
        fetchMessages({ conversationId: conversation })
            .then(data => setMessages(data))
        }
    }, [currentChatWith.id, currentUser.id,conversation,participants.length, setMessages]);  
    
    useEffect(() => {
        // Tin nhắn 1-1
        socket.on("receive-message", (message) => {
            setMessages(prev => [...prev, message]);
        });
        // Tin nhắn nhóm
        socket.on("receive-group-message", ({ groupId,  message }) => {
        console.log(`Tin nhắn nhóm ${groupId}:`, message);
        // Chỉ thêm nếu đang mở đúng group
        if (currentChatWith.id === groupId) {
            setMessages(prev => [...prev, message]);
        }
        });
        return () => {
            socket.off("receive-message");
            socket.off("receive-group-message");
        };
    }, [socket,currentChatWith.id]);

    return (
        <Box>
            <Stack>
                {messages.map((msg, index) => {
                        return (
                            <Box display="flex" justifyContent={currentUser.id === msg.senderId ? "flex-end" : "flex-start"} 
                            key={index} my={3} 
                            ref={(el) => {
                                if (el)
                                    {messagesRefs.current[msg.id] = el}
                                else {
                                    delete messagesRefs.current[msg.id]
                                }
                            }}>
                                <MessageBox isSender={currentUser.id === msg.senderId} name={users.find(user => user.id === msg.senderId)?.name} avatar={users.find(user => user.id === msg.senderId)?.avatar} type={msg.type} content={msg.content} time={msg.timeStamp}/>
                            </Box>
                            );
                    }
                )}
            <TypingIndicator userId={currentUser.id} userList={users}  />
            </Stack>
        </Box>
    );
}
export default React.memo(MessageList);