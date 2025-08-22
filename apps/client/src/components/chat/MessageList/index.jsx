import { Box, IconButton, Fade} from "@mui/material";
import { useEffect,useRef, useState, useCallback } from "react";
import MessageList from "./MessageList";
import { useMessages } from "../../../context/MessageContext";
import InputBar from "../InputBar";
import ChatHeader from '../../dashboard/ChatHeader'
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {debounce} from "lodash"
export default function MessageWindow() {

    const {messages} = useMessages()
    const scrollRef = useRef(null);
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    
    const scrollToBottom = () => {
        scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
        });
    };

    const handleScroll = useCallback(
        debounce(() => {
        if (!scrollRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const isAtBottom = scrollHeight - scrollTop <= clientHeight + 20;
        setShowScrollBtn(!isAtBottom);
        }, 100),
        []
    );
    useEffect(() => {
        if (!scrollRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const isAtBottom = scrollHeight - scrollTop <= clientHeight + 20;
        if (!isAtBottom) scrollToBottom();
    }, [messages]);
    useEffect(() => {
    return () => handleScroll.cancel();
    }, [handleScroll]);
    return(
        <Box
            display={"flex"}
            flexDirection={"column"}
            gap={0.5}
            height={'100vh'}
            width={"100%"}
        >
            <ChatHeader />
            <Box 
                display={"flex"}
                flexDirection={"column"}
                gap={1}
                px={2}
                pb={6}
                ref={scrollRef}
                onScroll={handleScroll}
                bgcolor={"#ffffff"}
                border={'1px solid'}
                flex={1}
                sx={{
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
                <MessageList />
                
                <Fade in={showScrollBtn}> 
                    <IconButton
                        onClick={scrollToBottom}
                        sx={{
                            position:'absolute',
                            bottom:'10vh',
                            right: '35vw',
                        }}
                    >
                        <ArrowDownwardIcon />
                    </IconButton>
                </Fade>
            </Box>
            
            <InputBar /> 

        </Box>
    );
}
