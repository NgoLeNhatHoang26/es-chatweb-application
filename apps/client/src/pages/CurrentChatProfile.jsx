import { Box,Grid } from "@mui/material";
import SideBarButtons from "../components/dashboard/SidebarFunction";
import UserProfile from "../components/profile/UserProfile/UserProfile";
import GroupProfile from "../components/profile/GroupProfile/index";
import { useChatTarget } from "../context/ChatTargetContext";
export default function CurrentChatProfile() {
    const profileBox = {
        width:{
            md: '60%',
            lg: '40%'
        },
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        borderRadius: 5,
        bgcolor: "#ade8f4",
        border: "1px solid",
        p: 5,
        boxShadow: '10'
    }
    const {currentChatWith} = useChatTarget()
    return(
        <Grid
            container
            display={"flex"}
            justifyContent={"space-between"}
            gap={1}
        >   
            <Grid
                item
                size={0.5}
            >
                <SideBarButtons />
            </Grid>

            <Grid
                item
                display={'flex'}
                justifyContent={"center"}
                alignItems={"center"}
                bgcolor={"background.background2"}
                border={"1px solid"}
                gap={1}
                flex={1}
            >
                <Box
                    sx={profileBox}
                 >
                    {
                        currentChatWith.type === "user" ? 
                            <UserProfile userprofile={currentChatWith}/>
                         : 
                            <GroupProfile userprofile={currentChatWith}/>
                    }
                </Box>
            </Grid>   
        </Grid>
    );
}