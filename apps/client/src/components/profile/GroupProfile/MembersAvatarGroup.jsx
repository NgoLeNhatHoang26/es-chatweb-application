import { Avatar, AvatarGroup } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
export default function MemberAvatarGroup({ users }) {
  const AvatarStyle = {
    width: {md: 30, lg: 40}, 
    height: {md: 30, lg: 40}
  }
  const IconStyle = {
    width: {md: 20, lg: 30},
    height: {md: 20, lg: 30}
  }
  return (
    <AvatarGroup
      spacing={24}
      max={3}
      sx={{
        alignSelf: 'center'
      }}
    >
      {users.length === 0 && (
        <Avatar>
          <GroupsIcon />
        </Avatar>
      )}
      {users?.[0]?.avatar ? <Avatar src={users[0].avatar} sx={AvatarStyle} /> : <Avatar sx={AvatarStyle}><PersonIcon sx={IconStyle}/></Avatar>}
      {users?.[1]?.avatar ? <Avatar src={users[1].avatar} sx={AvatarStyle}/> : <Avatar sx={AvatarStyle}><PersonIcon sx={IconStyle}/></Avatar>}
      {users?.[2]?.avatar ? <Avatar src={users[2].avatar} sx={AvatarStyle}/> : <Avatar sx={AvatarStyle}><PersonIcon sx={IconStyle}/></Avatar>}
    </AvatarGroup>
  );
}
