import { Box, Button, Grid, Paper,  Typography } from "@mui/material";
import login from "../components/asset/Login-welcome.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { fetchUsers } from "../services/userService";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();
    const password = watch("password");

    const { data: users, isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,   
    });
    console.log("forgetpassword")
    const handleResetPassword = (data) => {
        const user = users.find((u) => u.name === data.signInName);
        if (user) {
        axios
            .patch(`http://localhost:3001/users/${user.id}`, {
            password: data.password,
            })
            .then(() => {
            navigate("/");
            })
            .catch((err) => console.error(err));
        } else {
        reset();
        alert("Sai tên tài khoản hoặc mật khẩu không khớp");
        }
    };
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    return (
        <Grid
        container
        height={"100vh"}
        width={"100vw"}
        position="relative"
        overflow="hidden"
        bgcolor={"background.paper3"}
        >
        <Grid
            item
            size={{  xs: 0, sm: 4, md: 6, lg: 7, }}
        >
            <Box
            bgcolor={"background.paper2"}
            component="img"
            src={login}
            alt="welcome"
            sx={{ width: "100%", height: "100%" }}
            />
        </Grid>

        <Grid
            item
            size={{ sm: 8, md: 6,  lg: 5,}}
            
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
        >
            <Typography
            variant="h1"
            ml={8}  mb={3}
            sx={{
                fontFamily: "Roboto",
                fontWeight: "bold",
                fontSize: { xs: 0, sm: "4.875rem", md: "6.125rem", lg: "7rem" },       
            }}
            >
            WitChat
            </Typography>
            <Paper elevation={10} sx={PaperSx}>
            <Typography
                sx={{
                fontFamily: "Roboto",
                fontWeight: "bold",
                fontSize: {xs: "2.5rem", md: "3.125rem", lg: "3.5rem", },
                textAlign:'center',  
                }}
            >
                Đặt lại mật khẩu
            </Typography>

            {/* Tên đăng nhập */}
            <input
                placeholder="Tên đăng nhập"
                {...register("signInName", {
                required: "Tên đăng nhập không được bỏ trống",
                })}
                error={!!errors.signInName}

                style={style.input}
            />

            {/* Mật khẩu mới */}
            <input
                placeholder="Mật khẩu mới"
                type="password"
                {...register("password", {
                required: "Mật khẩu không được bỏ trống",
                })}
                error={!!errors.password}
                style={style.input}
            />

            {/* Nhập lại mật khẩu */}
            <input
                placeholder="Nhập lại mật khẩu"
                type="password"
                {...register("retryPassword", {
                required: "Vui lòng nhập lại mật khẩu",
                validate: (value) =>
                    value === password || "Mật khẩu nhập lại không khớp",
                })}
                error={!!errors.retryPassword}
                style={style.input}
            />
            <Button
                variant="outlinedSecondary"
                onClick={handleSubmit(handleResetPassword)}
                sx={{ mt: 1, width: "50%", padding: "12px 0px", borderRadius: 8, fontSize: "1.5rem", boxShadow: "5",  }}
            >
                Xác nhận
            </Button>
            <Button
                variant="outlinedPrimary"
                onClick={() => navigate("/")}
                sx={{mt: 1,width: "45%", padding: "12px 10px", borderRadius: 7, fontSize: "1.2rem", boxShadow: "5",}}
            >
                Đăng nhập
            </Button>
            </Paper>
        </Grid>
        </Grid>
  );
}

const PaperSx = {
  alignSelf: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
  width: '70%',
  height: "55%",
  py:2,
  mb: 20,
  border: "2px solid",
  borderRadius: 8,
};

const style = {
  input: {
    width: "70%",
    padding: "12px",
    fontSize: 20,
    border: "1px solid",
    borderRadius: "15px",
  },
};