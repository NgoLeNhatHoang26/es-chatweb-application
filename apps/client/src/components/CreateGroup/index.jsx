import {  Box } from "@mui/material";
import { useState, useCallback } from "react";
import CreateDisplay from "./CreateGroupDisplay";
import AddMembers from "./AddGroupMembers";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { fetchUsers } from "../../services/userService";
export default function AddGroup() {
    const {currentUser} = useUser()
    const [showUsersList,setShowUsersList] = useState(false)
    const [chooseUsers, setChooseUsers] = useState([])
    const [groupName,setGroupName] = useState("")
    const [newestUserId,setNewestUserId] = useState(0)
    const { data: users, isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,   
        select: (users) => users.filter(user => user.id !== currentUser.id)
    });
    const handleChooseUser = useCallback((user) => {
    setChooseUsers(user);
    }, []);
    const handleSetGroupName = useCallback((name) => {
        setGroupName(name)
    },[])
    const handleShowUserList = () => {
        setShowUsersList(!showUsersList);
    }

    const handleCreateGroup = useCallback(() => {
    if (chooseUsers.length > 0 ) {
        setChooseUsers(prev => [...prev, currentUser.id]);
        const LastestId = parseInt(users[users.length -1]?.id)
        const newestId = ( !LastestId || newestUserId > LastestId) ? newestUserId + 1: LastestId + 1
        setNewestUserId(newestId)
        const newGroup = {
        id : newestId ? String(newestId) : 0,
        type: "group",
        name: groupName,
        members: [...chooseUsers, String(newestId), currentUser.id]
        };
        axios.post("http://localhost:3001/users", newGroup);
        console.log("Tạo nhóm thành công");
        setChooseUsers([]);
        setShowUsersList(false);
        setGroupName("");
    } 
    }, [chooseUsers, currentUser, groupName, users]);
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    return(
        <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={{sm: '80%', lg: '60%'}}
        gap={5}
        >
            <CreateDisplay onChange={handleSetGroupName} setShowAddMembers={handleShowUserList} handleCreateGroup={handleCreateGroup} />
                {
                    showUsersList && (
                        <AddMembers onSend={handleChooseUser}  users={users}/>
                    )
                }
        </Box>
    );
}
