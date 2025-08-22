import { Box, Button } from "@mui/material";
import User from "../../chat/common/User"

export default function GroupMembers({ users, onMemberClick }) {
  return (
    <Box
      bgcolor="background.paper3"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        px: 2,
        borderRadius: '10px',
        height: '300px',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': { width: '8px' },
        '&::-webkit-scrollbar-track': { background: '#dcdcdc', borderRadius: '4px' },
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#555', borderRadius: '8px' },
        '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#333' },
      }}
    >
      {users.map((user, index) => (
        <Button key={index} onClick={() => onMemberClick(user)} sx={{width: '100%',display:'flex', justifyContent:'start'}}>
          <User name={user.name} avatar={user.avatar} />
        </Button>
      ))}
    </Box>
  );
}
