import { Box,Button,IconButton} from "@mui/material";
import User from  "../chat/common/User";
import CallIcon from '@mui/icons-material/Call';
import OptionsButton from "./HeaderOptionButton"
import { useEffect, useState } from "react";
import { useChatTarget } from "../../context/ChatTargetContext";
import { useNavigate } from "react-router-dom";
import Group from "../chat/common/Group"
import { fetchUsers } from "../../services/userService";
export default function ChatHeader() {
    const {currentChatWith} = useChatTarget();
    const [currentUser,setCurrentUser] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        const loadUser = async () => {
        const users = await fetchUsers();
        const foundUser = users.find(user => user.id === currentChatWith.id);
        setCurrentUser(foundUser);
        };
        if (currentChatWith?.id) loadUser();
    }, [currentChatWith]);
    return (
        <Box
            bgcolor="secondary.main"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            border="1px solid"
            borderColor="#000000"
            py={1}
            maxHeight={"70px"}
        >
            <Button onClick={() => navigate("/chatprofile")}>
            <Box 
                display="flex" 
                alignItems="start" 
            >
            {currentUser && (
                (currentChatWith.type === "user") ? (
                <User avatar={currentUser.avatar} name={currentUser.name} status="online" />
                ) : (
                <Group name={currentUser.name} members={currentUser.members} />
                )
            )}
            </Box>
            </Button>
            <Box 
                display="flex" 
                alignItems="center" 
                paddingX={3} 
                gap={{xs: 2, md: 4}}
            >
                <IconButton> <CallIcon /> </IconButton>
                <OptionsButton />
            </Box>
        </Box>
    );
}