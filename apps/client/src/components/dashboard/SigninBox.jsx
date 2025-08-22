import { Box, Button, Paper, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../services/userService";

const style = {
  input: {
    width: '75%',
    fontSize: 20,
    padding: '12px',
    border: '1px solid',
    borderRadius: 6
  }
}
export default function SigninBox() {
  const navigate = useNavigate();
  const [newestUser, setNewestUser] = useState();
  const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      reset
    } = useForm({
      defaultValues : {
        name: "",
        password: "",
        phone: "",
        retryPassword: ""

      }
    })
  useEffect(() => {
    fetchUsers()
        .then(data =>{ 
            data.length > 0 && setNewestUser(data[data.length-1])
        })
        .catch(err => console.error(err))
  },[])

  const password = watch("password");
  const onSubmit = (data) => {
      const newUser = {
        id: newestUser ? String(parseInt(newestUser.id) + 1) : 1,
        name: data.name,
        password: data.password,
        SDT: data.phone,
      };
      axios.post("http://localhost:3001/users", newUser);
      alert("Đăng ký thành công");
      reset(); // reset form
      navigate("/");
  };

  return (
    <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        height={'100vh'}
    >         
        <Typography     
            variant="h1"
            ml={8}
            mb={3}
            sx={{
              fontFamily: 'Roboto',
              fontWeight: 'bold',
              fontSize: { xs:0, sm: '4.875rem',  md: '6.125rem', lg: '7rem', }  
            }}
        >
            WitChat
        </Typography>
        
        <Paper
            elevation={10}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                alignSelf: 'center',
                display: "flex",          
                flexDirection: "column",  
                alignItems: "center",
                justifyContent: 'space-evenly',
                width: { md: '70%', lg : "60%" },
                height: '55%',
                py: 2,
                mb: 10,
                border: '2px solid',
                borderRadius: 8,
            }}
            >
            <Typography 
            variant="h2" 
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                fontSize: { xs: '2rem',  md: '3.125rem', lg: '3.5rem' },
              }} 
            >
                Đăng ký
            </Typography>

            <input
              placeholder="Tên đăng nhập"
              {...register("name", { required: "Tên đăng nhập không được bỏ trống"})}
              error={!!errors.name}
              style={style.input}
            /> 
            {errors.name && errors.name.message}
            <input
              placeholder="Số điện thoại" 
              {...register("phone", { required: "Số điện thoại không được bỏ trống"})}
              error={!!errors.phone}
              style={style.input}
            />
            {errors.phone && errors.phone.message}
            <input
              type="password"
              placeholder="Mật khẩu"
              {...register("password", {required: "Mật khẩu không được bỏ trống"})}
              error={!!errors.password}
              style={style.input}
            />
            {errors.password && errors.password.message}
            <input
              placeholder="Nhập lại mật khấu"
              {...register("retryPassword", {
                required: "Vui lòng nhập lại mật khẩu",
                validate : (values) => values === password  || "Mật khẩu nhập lại không khớp",
              })}
              type="password"
              error={!!errors.retryPassword}
              style={style.input}
            />
            {errors.retryPassword && errors.retryPassword.message}
            <Button
                variant="outlinedSecondary"
                type="submit"
                sx={{
                    mt: 1,
                    width: '50%',
                    padding: '12px 0px',
                    borderRadius: 8,
                    fontSize: '1.5rem'
                }}
            >
                Đăng ký
            </Button> 
            <Button
                variant="outlinedPrimary"
                onClick={() => navigate("/")}
                sx={{
                mt: 1,
                width: '45%',
                padding: '12px 10px',
                borderRadius: 7,
                fontSize: '1.3rem'
                }}
            >
                Đăng nhập
            </Button>               
            </Paper>
        </Box> 
  );
}
