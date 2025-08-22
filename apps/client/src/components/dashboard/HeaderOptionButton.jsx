import { Box, Button, IconButton} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchMessage from "./SearchMessage";
import SearchFile from "./SearchFile";
import { useEffect, useState } from "react";
import { useChatTarget } from "../../context/ChatTargetContext";

function OptionButton({ icon, label, onClick }) {
    return (
        <Button
          variant="outlinedPrimary"
          onClick={onClick}
          sx={{
            borderRadius: '12px',
            border: '1px solid #000000',
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            color="#000000"
            fontWeight="bold"
          >
            {icon}
            {label}
          </Box>
        </Button>
    );
}

export default function OptionsButton() {
        const [showOptions, setShowOptions] = useState(false);
        const { currentChatWith ,setCurrentChatWith } = useChatTarget();
        const [view,setView] = useState("")
        useEffect(() => {
          showOptions && setShowOptions(false)
        },[currentChatWith])
    return (
      <Box>
        <IconButton onClick={() => {
          setShowOptions(prev => !prev)
          setView("")
          }}>
          <MoreVertIcon />
        </IconButton>

        {showOptions && (
          <Box
            sx={{
              display:'flex',
              flexDirection: "row-reverse",
              position: 'absolute',
              top: '7.5vh',
              right: 15,
              zIndex: 2000,
              gap: 3,
            }}
          >
            <Box
              sx={{
                
                height: "fit-content",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderRadius: 5,
                bgcolor: "#48cae4",
                border: "1px solid",
                p: 2,  
              }}
            >  
              <OptionButton icon={<SearchIcon />} label="Tìm kiếm tin nhắn" onClick={() => {
                  view === "SearchMessage" ? setView("") : setView("SearchMessage")
              }}/>
              <OptionButton 
                  icon={<InsertDriveFileIcon />} 
                  label="File phương tiện"
                  onClick={()=> {
                    view === "SearchFile" ? setView("") : setView("SearchFile")
              }}/>
              <OptionButton
                icon={<LogoutIcon />}
                label="Rời khỏi cuộc trò chuyện"
                onClick={() => setCurrentChatWith({ id: 0 })}
              />
            </Box>
            {view === "SearchMessage" && (
                  <SearchMessage />)

              }
              {view === "SearchFile" &&  (
                <SearchFile />
              )}
          </Box>
          
        )}
      </Box>
    );
}
