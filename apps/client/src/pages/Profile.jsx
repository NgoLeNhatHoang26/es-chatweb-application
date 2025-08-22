import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import SideBarButtons from "../components/dashboard/SidebarFunction";
import UserProfile from "../components/profile/UserProfile/UserProfile";
import { useUser } from "../context/UserContext";
import ChangeInfor from "../components/profile/UserProfile/ChangeInfor";
import ChangePassword from "../components/profile/UserProfile/ChangePassword";
export default function Profile() {
    const profileBoxSx = {
        width: { sm :'80%', md: '70%', lg: '50%' },
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        borderRadius: 5,
        bgcolor: "#ade8f4",
        border: "1px solid",
        p: 5,
        boxShadow: '10'
    };
    const {setCurrentUser, currentUser} = useUser()

    const [view, setView] = useState("Profile");
    return(
        <Grid container
            display={"flex"}
            justifyContent={"space-between"}
            width={'100vw'}
            height={'100vh'}
            gap={1}
        >   
            <Grid item
                xs="auto"
                sx={{
                width: { xs: 40, sm: 50, md: 60, lg: 70 },
                flexShrink: 0
                }}
            >
                <SideBarButtons />
            </Grid>

            <Grid 
                item
                display={'flex'}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                bgcolor={"background.background2"}
                border={"1px solid"}
                gap={1}
                flex={1}
            >
                { view === "Profile" && (
                    <Box
                        gap={3}
                        sx={profileBoxSx}
                    >
                        <UserProfile userprofile={currentUser}/>
                    
                        <Button
                            onClick={() => setView("Password")}
                            variant="outlinedSecondary"
                            sx={{
                                fontSize:'1.2rem',
                                width: {
                                    md: '40%',
                                    lg: '30%'
                                },
                                alignSelf: 'center',
                                padding: 2,
                                boxShadow:'5'
                            }}
                            >
                            Đổi mật khẩu
                        </Button>
                        <Button
                            onClick={() => setView("Infor")}
                            variant="outlinedSecondary"
                            sx={{
                                fontSize:'1.2rem',
                                width: {
                                    md: '40%',
                                    lg: '30%'
                                },
                                alignSelf: 'center',
                                padding: 2,
                                boxShadow:'5'
                            }}
                        >
                            Đổi thông tin cá nhân
                        </Button>
                    </Box>
                )}
                
                { view === "Password"&& (
                    <ChangePassword 
                        onReturn={setView}
                        setCurrentUser={setCurrentUser}
                    />
                )}

                { view === "Infor" &&(
                    <ChangeInfor 
                        onReturn={setView}
                        setCurrentUser={setCurrentUser}
                    />
                )}
            </Grid>
        </Grid>
    );
}
