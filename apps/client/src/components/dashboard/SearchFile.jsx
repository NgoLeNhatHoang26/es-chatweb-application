import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMessages } from "../../context/MessageContext";

function SearchFile () {
    const {messages, scrollToMessage} = useMessages()
    const [filteredMessages, setFilteredMessages] = useState([])
    useEffect(() => {
        const FectchFilter = async () => {
            try {
                setFilteredMessages(messages.filter(msg=>
                msg.type === "image"))
            } catch (err) {
                console.error(err);
            };
        }
        FectchFilter();
    },[messages]);
    return (
        <Box
        bgcolor={"#FFFFFF"}
        border={'1px solid #000000'}
        height={"fit-content"}
        p={1}
        m={1}
        sx={{
            maxWidth: {sm: "40vw", lg: "30vw"},
            maxHeight:"50vh",
            width: {md: "100%", lg: "60%"},
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
            {(filteredMessages && filteredMessages.length > 0 ) ? (
                filteredMessages.map(msg => 
                <Button
                    onClick={() => scrollToMessage?.(msg.id)}
                    sx={{
                        p: "2px 0",
                        mb: 1
                    }}
                >
                    <img
                        src={msg.content}
                        alt="Attached"
                        style={{ width:"100%", borderRadius: "8px"}}
                    />
                </Button>)
            ) : (
            <Typography 
                p={1} variant="body1" 
                fontWeight={"bold"}
                textAlign={"center"}
            >
                Không tìm thấy File nào
            </Typography>
            )}
            
        </Box>
    );
}
export default React.memo(SearchFile)