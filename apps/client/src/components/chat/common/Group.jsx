import { Box, Typography , Stack} from "@mui/material";
import React, { useEffect, useState} from "react";
import { fetchUsers } from "../../../services/userService";
import MembersAvatarGroup from "../../profile/GroupProfile/MembersAvatarGroup"
function Group({ name, members }) {
    const [users, setUsers] =useState([])
    // Lấy thông tin user của 3 user trong nhóm
    useEffect(() => {
        fetchUsers()
            .then (data => {
                (data) && setUsers(data.filter(user => members?.includes(user.id)))
            })
            .catch (err => console.log(err))
    },[members])
    return(
        <Box
            display={'flex'}
            alignItems="center"
            justifyContent={'start'}
            gap={2}
        >
            <MembersAvatarGroup users={users || []}/>
            <Stack direction="column" spacing={0}  >
                <Typography variant="h5" fontWeight={'bold'} color="text.primary" textAlign={"start"} fontSize={{xs: "1.1rem", md: "1.3rem"}}>{name}</Typography>
                <Typography variant="subtitle1" color="#5C5C5C" alignSelf={"start"}>online</Typography>
            </Stack>
        </Box>
    );
}
export default React.memo(Group)