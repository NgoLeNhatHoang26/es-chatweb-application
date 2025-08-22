import { Box, IconButton} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useEffect, useState} from "react";
import React from "react";
function AttachFileButton({ onFileSelect,hideAttach }) {
  const [showAttach, setShowAttach] = useState(false);
  useEffect(()=>{
    setShowAttach(false)
  },[hideAttach])
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onFileSelect(file);
  };
  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      {showAttach && (
        <Box
          bgcolor="secondary.main"
          sx={{ position: "absolute", bottom: '7vh' }}
          borderRadius={2}
          p={2}
        >
          <input type="file" onChange={handleFileChange} />
        </Box>
      )}
      <IconButton onClick={() => setShowAttach(!showAttach)}>
        <AttachFileIcon />
      </IconButton>
    </Box>
  );
}
export default React.memo(AttachFileButton)
