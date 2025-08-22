import { Box, Button, Typography, OutlinedInput } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useMessages } from "../../context/MessageContext";
function SearchMessage () {
    const {currentUser} = useUser()
    const {messages, scrollToMessage} = useMessages()
    const [query, setQuery] = useState("")
    const [filteredMessages, setFilteredMessages] = useState([])
    useEffect(() => {
        const FectchFilter = async () => {
            try {
                setFilteredMessages(messages.filter(msg=>
                msg.type === "text" &&
                msg.content?.toLowerCase().includes(query.toLowerCase())))
            } catch (err) {
                console.error(err);
            };
        }
        FectchFilter();
    },[query,messages]);
    return (
        <Box
        position={"relative"}
        height={"fit-content"}
        p={2}
        bgcolor={"background.paper2"}
        >
            <OutlinedInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm tin nhắn"
                display={"inline-block"}
                sx={{
                    '& .MuiOutlinedInput-root': {
                    width: { sm: "35vw",lg: "20vw"},
                    borderRadius: 4,
                    fontSize: '1.2em',
                    },
                borderRadius: 4,
                width: { sm: "35vw",lg: "20vw"}
                }}  
                />
        {query && (        
            <Box
            bgcolor={"#FFFFFF"}
            border={'1px solid #000000'}
            zIndex={1}
            my={1}
            sx={{
                maxHeight:"30vh",
                width: { sm: "35vw",lg: "20vw"},
                cursor: 'pointer',            
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
                { (filteredMessages && filteredMessages.length > 0 ) ? (
                filteredMessages.map(msg => 
                    <Button
                        key={msg.id}
                        onClick={() => scrollToMessage?.(msg.id)}
                        sx={{
                            width: "100%",
                            p: "2px 0"
                        }}
                    >
                        <Typography variant="body1" fontSize="1rem" 
                            bgcolor={msg.senderId === currentUser.id ? "messageBubble.out" : "messageBubble.in"} 
                            color={msg.senderId === currentUser.id ? "white" : "inherit"} 
                            p={1} width={"100%"} textAlign={'start'}

                        >
                            {msg.content} 
                        </Typography>
                    </Button>)
                ) : (
                <Typography 
                    p={1} variant="body1" 
                    fontWeight={"bold"}
                >
                    Không tìm thấy tin nhắn
                </Typography>
                )}
            </Box>
        )}
        </Box>
    );
}
export default React.memo(SearchMessage)