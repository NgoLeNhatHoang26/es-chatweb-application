import { Box, Button, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
export default function SettingButton() {
    const [showSetting, setShowSetting] = useState(false);
    const navigate = useNavigate();
    return (
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <IconButton
                variant="outlinedPrimary"
                onClick={() => setShowSetting(!showSetting)}
                sx={{
                    width: { xs: '30px', sm: '40px', md: '45px' },
                    height: { xs: '30px', sm: '40px', md: '45px'}
                }}    
            >
                <SettingsIcon
                    sx={{
                        width: { xs: '20px', sm: '25px', md: '30px'},
                        height: { xs: '20px', sm: '25px', md: '30px' }
                }}    />
            </IconButton>
            {showSetting && 
            <Box
                gap={2}
                sx={{
                    position:'absolute',
                    display: 'flex', flexDirection: 'column',
                    width: 'fit-content',
                    bgcolor: '#48cae4',
                    border: '1px solid #000000', borderRadius: '8px',
                    zIndex: 100,
                    p: 1, mt:1
            }}
            > 
                <Button
                    onClick={() => navigate('/creategroup')}
                    variant="outlinedPrimary"
                    sx={{
                        borderRadius: '12px',
                        border: '1px solid #000000'
                    }}
                >
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        color={"#000000"}
                        fontWeight={"bold"}
                        gap={1}
                        fontSize={'0.8rem'}
                    >
                        <GroupIcon 
                        sx={{
                            width: '30px',
                            height:'30px'
                        }}
                        />
                        Tạo nhóm
                    </Box>  
                </Button>
                <Button
                    variant="outlinedPrimary"
                    sx={{
                        borderRadius: '12px',
                        border: '1px solid #000000',
                    }}
                    onClick={() => {
                        localStorage.removeItem("currentUser")
                        navigate("/")
                    }}
                >
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        color={"#000000"}
                        fontWeight={"bold"}
                        gap={1}
                        fontSize={'0.8rem'}
                    >
                    <LogoutIcon
                        sx={{
                            width: '30px',
                            height:'30px'
                        }}
                    />
                        Đăng xuất
                    </Box>  
                </Button>  
            </Box>}
        </Box>
    );
}