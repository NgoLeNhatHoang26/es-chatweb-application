import { Box, Button } from "@mui/material";
import React from "react";
import User from "./User";
function UserList ({users,isChosen,onSelect,additionEff}) {
    return (
        <Box>
        {users.map(user => (
            <Button
            key={user.id}
            sx={{
                display: 'flex',
                justifyContent:'start',
                width:'100%',
                bgcolor: user.id === (isChosen || 0) ? "#48cae4" : "transparent",
                "&:hover": {
                    bgcolor: "#ade8f4"
                }      
            }}
            onClick={() => {
                onSelect(user)
                additionEff("")
            }}
            >
            <User
                name={user.name}
                avatar={user.avatar}
                />
            </Button>
        ))}
        </Box>
    );
}
export default React.memo(UserList)