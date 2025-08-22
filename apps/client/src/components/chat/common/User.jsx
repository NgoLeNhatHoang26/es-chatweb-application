import { Box, Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";

function User({ name, avatar, status }) {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="start"
            gap={2}
            my={1}
        >
            <Avatar
                src={avatar || undefined}
                sx={{
                    border: "2px solid",
                    borderColor: "#000000",
                    width: { xs: 30, sm: 40, md: 40 },
                    height: { xs: 30, sm: 40, md: 40 }
                }}
            >
                {!avatar && <PersonIcon />}
            </Avatar>
            <Stack direction="column">
                <Typography 
                    variant="h5" 
                    fontWeight="bold" 
                    color="text.primary" 
                    fontSize={{xs: "1.1rem", md: "1.3rem"}}
                >
                    {name || "No Name"}
                </Typography>
                <Typography color="text.secondary" alignSelf="start">
                    {status || ""}
                </Typography>
            </Stack>
        </Box>
    );
}
export default React.memo(User)