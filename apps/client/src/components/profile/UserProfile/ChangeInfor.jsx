import { Avatar,Paper, Typography, Box, TextField, Button } from "@mui/material";
import { useState} from "react";
import { useUser } from "../../../context/UserContext";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
export default function ChangeInfor({ onReturn, setCurrentUser }) {
  const { currentUser } = useUser();
  const [userName, setUserName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.SDT);

  const handleChangeInfor = async () => {
    const olderUser = currentUser;
    setCurrentUser({...currentUser,name: userName, SDT: phone})
    try {
      await axios.patch(
        `http://localhost:3001/users/${currentUser.id}`,
        { name: userName, SDT: phone }
      );
      onReturn("Profile")
    } catch (error) {
      console.error("Error", error);
      setCurrentUser(olderUser)
    }
  };

  const handleChangAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedAvatar = reader.result;
        axios
          .patch(`http://localhost:3001/users/${currentUser.id}`, { avatar: updatedAvatar })
          .then((response) => {
            localStorage.setItem(
              "currentUser",
              JSON.stringify({ ...currentUser, avatar: updatedAvatar })
            );
            setCurrentUser(prev => ({ ...prev, avatar: updatedAvatar }));
            
          })
          .catch((error) => console.error("Error updating avatar:", error));
      };
      reader.readAsDataURL(file);
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
        p: "0px 20px 40px 20px",
        border: "2px solid",
        borderRadius: 8,
      }}
    >
      <Typography variant="h3" my={3} pt={3} fontWeight="bold" fontSize={{sm: "2.5rem", md:"3rem"}} textAlign="center" >
        Chỉnh sửa thông tin cá nhân
      </Typography>
      <Avatar
        src={currentUser.avatar || undefined}
          sx={{
            border: "2px solid",
            borderColor: "#000000",
            width: { xs: 32, sm: 60, md: 100, lg: 150},
            height: { xs: 32, sm: 60, md: 100, lg: 150}
        }}
        >
                {!currentUser.avatar && <PersonIcon />}
            </Avatar>      
      <Box display={"flex"} flexDirection={"column"} width={"50%"} gap={3} mt={"5%"}>
        <TextField label="Tên tài khoản" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <TextField label="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Typography variant="h5" fontWeight="bold">
          Đổi ảnh đại diện
        </Typography>
        <input type="file" onChange={handleChangAvatar} />
      </Box>

      <Button 
        variant="outlinedSecondary" 
        onClick={handleChangeInfor} 
        sx={{ mt: 3, p: 2, fontSize: '1.2rem'}}>
        Xác nhận
      </Button>
      <Button
        variant="outlinedPrimary"
        onClick={() => onReturn("Profile")}
        sx={{ mt: 3, p: 2, fontSize: '1.2rem'}}
      >
        Hủy
      </Button>
    </Paper>
  );
}
