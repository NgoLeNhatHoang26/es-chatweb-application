import { Box, Button,Typography } from "@mui/material";
import  React, {useEffect} from "react";
import User from "../common/User";
import Group from "../common/Group";
import socket from "../../../socket";
import { useUser } from "../../../context/UserContext";
import { useChatTarget } from "../../../context/ChatTargetContext";
function ChatList ({usersList})  {
    const {currentUser} = useUser()
    const {currentChatWith,setCurrentChatWith} = useChatTarget()    
    useEffect(() => {
        if (currentChatWith.type === "group") {
            socket.emit("join-group", currentChatWith.id);
        }
    }, [currentChatWith, socket]);
    const renderUserButton = (user) => {
        const isCurrent = user.id === (currentChatWith.id || 0);
        let DisplayComponent;
        let componentProps = { name: user.name };

        if (user.type === "user") {
            DisplayComponent = User;
            componentProps.avatar = user.avatar;
            componentProps.status = "online";
        } else if (user.type === "group" && user.members.includes(currentUser.id)) {
            DisplayComponent = Group;
            componentProps.members = user.members;
        } else {
            return null; // không render nếu không phù hợp
        }

        return (
            <Button
            key={user.id}
            onClick={() => setCurrentChatWith(user)}
            sx={{
                display: 'flex',
                justifyContent: 'start',
                width: '100%',
                pl: 1 ,
                ...(isCurrent ? { bgcolor: "#ade8f4" } : {})
            }}
            >
            <DisplayComponent {...componentProps} />
            </Button>
        );
    };
    return (
    <Box
            bgcolor={"background.paper3"}
            sx={{
            display:"flex",
            flexDirection: 'column',
            height: '100%',
            py: 1,
            px: 1,
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                width: '8px',
            },
            '&::-webkit-scrollbar-track': {
                background: '#dcdcdc',
                borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#555',
                maxLines: 2,
                borderRadius: '8px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#333',
            },
        }}
        >   
            {usersList.length > 0 ?  usersList.map(user => renderUserButton(user)) : (
                <Typography 
                    p={1} variant="body1" 
                    fontWeight={"bold"}
                    fontSize={"1.1rem"}
                >
                    Không tìm thấy người dùng
                </Typography>
            )}
            
        </Box>
    );
}
export default React.memo(ChatList)