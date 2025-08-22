import { Box, Typography } from "@mui/material";
import React, { useState, useMemo} from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../../services/userService";
import ChatList from "./ChatList";
import Searchbar from "./Searchbar";
import { useUser } from "../../../context/UserContext";

function ChatBox() {
    const [query, setQuery] = useState(""); 
    const {currentUser} = useUser();
    const { data: users, isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,   
        select: (users) => users.filter(user => user.id !== currentUser.id)
    });
    const filteredUsers = useMemo(() => {
    if (!query) return users;
    return users.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase())
    );
    }, [query, users]);
    const handleChange = (name) => {
        setQuery(name)
    }
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    return (
        <Box
            display={'flex'}
            flexDirection={"column"}
            bgcolor={"background.background2"}
            height={'100vh'}
            border={'1px solid'}
            sx={{
                width: "100%"
            }}
            overflow={"hidden"}
        >
            <Box
                display={'flex'}
                alignItems={'center'}
                width={'100%'}
                height={'10%'}
                bgcolor={"secondary.main"}
                p={2}
            >
                <Typography
                    variant="h3"
                    color="text.primary"
                    sx={{
                        fontSize: {
                        xs: '1.5rem',
                        sm: '2.5rem',
                        lg: '3rem'
                    },
                    fontWeight:'bold'
                }}
                >Chatbox
                    </Typography>
                </Box>
                 {/* Search bar */}
                <Searchbar onChange={handleChange} />

                {/* Chat list */}
                <ChatList usersList={filteredUsers}/>

            </Box>
        
    );
}
export default React.memo(ChatBox)