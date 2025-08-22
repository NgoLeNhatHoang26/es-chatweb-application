import { Box, Typography } from "@mui/material";
import MemberAvatarGroup from "./MembersAvatarGroup";
import GroupMembers from "./GroupMembers";

export default function GroupInfo({ group, users, onMemberClick }) {
  return (
    <Box
      gap={3}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <Typography variant="h4" alignSelf="center" sx={{ fontWeight: "bold", fontSize: "3vw" }}>
        Thông tin nhóm
      </Typography>

      <MemberAvatarGroup users={users} />

      <Box display="flex" flexDirection="column" alignSelf="center" gap={2} sx={{ width: { md: '70%', lg: '60%' } }}>
        <Typography fontWeight="bold">Tên nhóm</Typography>
        <Typography bgcolor="#ffffff" p={2} borderRadius={6} fontSize={"1.2rem"}>
          {group.name}
        </Typography>
        <Typography fontWeight="bold">Thành viên</Typography>
        <GroupMembers users={users} onMemberClick={onMemberClick} />
      </Box>
    </Box>
  );
}
