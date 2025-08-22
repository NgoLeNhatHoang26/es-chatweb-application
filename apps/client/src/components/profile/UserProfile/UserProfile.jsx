import { Avatar, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useUser } from "../../../context/UserContext";
export default function UserProfile({ userprofile }) {
  const [user] = useState(
    userprofile || { name: "", SDT: "", password: "" }
  );
  const {currentUser} = useUser()
  let infoFields 
  {userprofile.id === currentUser.id ?  (
  infoFields= [
    { label: "Tên đăng nhập", value: user.name },
    { label: "Số điện thoại", value: user.SDT },
    { label: "Mật khẩu", value: user.password },
  ]) : (
    infoFields= [
    { label: "Tên đăng nhập", value: user.name },
    { label: "Số điện thoại", value: user.SDT },
  ])
}
  const valueStyle = {
    bgcolor: "#ffffff",
    p: 2,
    borderRadius: 6,
    fontSize: '1.3rem'
  };

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
      <Typography
        variant="h4"
        alignSelf="center"
        sx={{ fontWeight: "bold", fontSize: "3vw" }}
      >
        Thông tin cá nhân
      </Typography>

      <Avatar
        src={user.avatar}
        alt={user.name}
        sx={{
          width: { md: "15vw", lg: "10vw" },
          height: { md: "15vw", lg: "10vw" },
          alignSelf: "center",
          border: "1px solid",
        }}
      />

      <Box
        display="flex"
        flexDirection="column"
        alignSelf="center"
        gap={2}
        sx={{ width: { sm:"70%" ,md: "70%", lg: "60%" } }}
      >
        {infoFields.map((field, i) => (
          <Box key={i}>
            <Typography fontWeight="bold">{field.label}</Typography>
            <Typography sx={valueStyle}>{field.value}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
