import { Avatar, Box, Button, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ChatIcon from '@mui/icons-material/Chat';
import SettingButton from "./SettingButton";
import { useUser } from "../../context/UserContext";
import { useChatTarget } from "../../context/ChatTargetContext";
import { useNavigate } from "react-router-dom";

function SidebarIcon({ icon: Icon, onClick }) {
  return (
    <IconButton onClick={onClick} 
      sx={{ 
        width: { xs: '30px', sm: '40px', md: '45px'},
        height: { xs: '30px', sm: '40px', md: '45px'}
      }}>
      <Icon 
        sx={{ 
          width: { xs: '20px', sm: '25px', md: '30px'},
          height: { xs: '20px',sm: '25px', md: '30px' }
      }} />
    </IconButton>
  );
}

export default function SideBarButtons({ onSendCB }) {
  const navigate = useNavigate();
  const { currentUser} = useUser();
  const {setCurrentChatWith} = useChatTarget();
  const iconBoxSize = {xs: '50px', sm: '3.5vw', md: '3vw', lg: '2.5vw'};
  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor="primary.main"
      border="0.5px solid"
      p={2}
      gap={3}
    >
      <Button 
        onClick={() => navigate("/userprofile")} 
        sx={{ width: "fit-content", height: "fit-content" }}
      >
        <Avatar
          src={currentUser.avatar}
          alt={currentUser.name}
          sx={{
            border: "1px solid #000000",
            width: {xs: '30px', sm: '40px', md: '45px'},
            height: { xs: '30px', sm: '40px', md: '45px'}
          }}
        />
      </Button>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ width: iconBoxSize, height: iconBoxSize }}
        gap={2}
      >
        <SidebarIcon icon={MenuIcon} onClick={() => typeof onSendCB === "function" && onSendCB()} />
        <SidebarIcon
          icon={ChatIcon}
          onClick={() => {
            setCurrentChatWith({ id: 0 });
            navigate('/home');
          }}
        />
        <SettingButton />
      </Box>
    </Box>
  );
}

