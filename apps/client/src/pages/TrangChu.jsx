import {  Box, Typography } from "@mui/material";
import {  useState } from "react";
import SideBarButtons from "../components/dashboard/SidebarFunction";
import ChatBox from "../components/chat/ChatBox";
import MessageWindow from "../components/chat/MessageList";
import { useChatTarget } from "../context/ChatTargetContext";
export default function TrangChu() {
    
    const {currentChatWith} = useChatTarget()
    const [showChatBox, setShowChatBox] = useState(true)
    const showMessageWindow = currentChatWith?.id !== 0
    const handleShowChatBox = () => {
        setShowChatBox(prev => !prev)
    }
    return(
        <Box
            height={'100vh'}
            display={"flex"}
        >   
       <Box
                sx={{
                width: { xs: 40, sm: 50, md: 60},
                flexShrink: 0,
                }}
            >
                <SideBarButtons onSendCB={handleShowChatBox}/>
            </Box>
            {showChatBox && (
                <Box
                sx={{
                    maxWidth:"250px",
                    borderRight: "1px solid #ddd",
                    width: { xs: 100, sm: 200, md: 300},
                }}
                >
                    <ChatBox />
                </Box>
            )}
            <Box flex={1} ml={1}> 
                {showMessageWindow ? (
                    <MessageWindow />
                ) : (
                    <Box 
                    display={"flex"}
                    alignItems={'center'}
                    justifyContent={'center'}
                    bgcolor={"#ffffff"} 
                    border={'1px solid'}
                    height={"100vh"}
                    p={1}
                    >     
                        <Typography variant="h5" textAlign={"center"}fontSize={{xs: '1rem', md:'1.2rem', lg: '2rem'}}>
                            Chọn một người để bắt đầu cuộc trò chuyện
                        </Typography>
                    </Box>      
                )}
            </Box>
        </Box>
    );
}