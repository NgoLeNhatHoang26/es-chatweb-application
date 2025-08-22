import { Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import GroupInfo from "./GroupInfor";
import UserProfile from "../UserProfile/UserProfile";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../../services/userService";
export default function GroupProfile({ userprofile }) {
  const group = userprofile || { name: "", members: [] };
  const [users, setUsers] = useState([]);
  const [showMemberProfile, setShowMemberProfile] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const navigator = useNavigate()
  useEffect(() => {
    fetchUsers()
      .then(data => {
        const filtered = data.filter(
          user => group.members.includes(String(user.id)) && user.type !== "group" 
        );
        setUsers(filtered);
      })
      .catch(err => console.log(err));
  }, [group.members]);

  const handleMembersProfile = (user) => {
    setUserProfile(user);
    setShowMemberProfile(true);
  };
  return (
    <Box display={"flex"} flexDirection={"column"}>
      {!showMemberProfile ? (
        <Box display={"flex"} flexDirection={"column"}>
          <GroupInfo group={group} users={users} onMemberClick={handleMembersProfile} />
          <Button
            onClick={() => navigator("/home")}
            variant="outlinedPrimary"
            sx={{ width: { md: '30%', lg: '20%' }, p: 2,mt: 2, alignSelf:'center'}}
          >
            <CloseIcon />
          </Button>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <UserProfile userprofile={userProfile}  />
            <Button
            onClick={() => setShowMemberProfile(false)}
            variant="outlinedPrimary"
            sx={{ width: { md: '30%', lg: '20%' }, p: 2,mt: 2, alignSelf:'center'}}
          >
            <CloseIcon />
          </Button>
        </Box>
      )}
    </Box>
  );
}
