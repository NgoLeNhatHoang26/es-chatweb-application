import { Paper, Typography, Box, Button, OutlinedInput } from "@mui/material";
import { useState } from "react";
import { useUser } from "../../../context/UserContext";
import axios from "axios";

export default function ChangePassword({ onReturn, setCurrentUser }) {
  const { currentUser } = useUser();
  const [password, setPassword] = useState("");
  const [retryPassword, setRetryPassword] = useState("");
  const handleResetPassword = async () => {
  if (retryPassword === password && password !== "") {
    setCurrentUser({ ...currentUser, password });
    try {
      await axios.patch(
        `http://localhost:3001/users/${currentUser.id}`,
        { password }
      );
      onReturn("Profile");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  } else {
    setRetryPassword("");
    setPassword("");
    alert("Mật khẩu không khớp.")
  }
};

  return (
    <Paper
      elevation={10}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: { md: "50vw", lg: "40vw" },
        border: "2px solid",
        borderRadius: 8,
        p: '0 40px 40px 40px'
      }}
    >
      <Typography variant="h2" mt={3} pt={3} fontWeight={"bold"} fontSize={"3rem"}>
        Đặt lại mật khẩu
      </Typography>

      <Box
        display={"flex"}
        flexDirection={"column"}
        width={"60%"}
        sx={{ mt: 4}}
        gap={3}
      >
        <OutlinedInput
          placeholder="Mật khẩu mới"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <OutlinedInput
          value={retryPassword}
          onChange={(e) => setRetryPassword(e.target.value)}
          placeholder="Nhập lại mật khẩu"
          type="password"
        />
      </Box>
      <Button 
        variant="outlinedSecondary"
        onClick={handleResetPassword}
        sx={{width: '50%' , mt: 3, p: 2, fontSize: '1.2rem'}}>
        Xác nhận    
      </Button>
      <Button variant="outlinedPrimary" onClick={() => onReturn("Profile")}
        sx={{width: '30%', mt: 3, p: 2, fontSize: '1.2rem'}}>
        Hủy
      </Button>
    </Paper>
  );
}
