import {Button, Paper,Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/UserContext";
import { fetchUsers } from "../../services/userService";
const styles ={
  input: {
    width: '70%',
    padding: "12px",
    fontSize: 25,
    border: "1px solid",
    borderRadius: "15px"
  },
}
export default function LoginBox() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([])
  const {setCurrentUser} = useUser()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues : {
      name: "",
      password: ""
    }
  })
  useEffect(()=> {
    fetchUsers().then(data => setUsers(data))
  },[setCurrentUser])
  console.log("Login")
  const onSubmit = (data) => {
    const matchedUser = users.find(
      (user) => user.name === data.name && user.password === data.password
    );

    if (matchedUser) {
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      setCurrentUser(matchedUser);
      navigate("/home");
    } else {
      reset(); // reset input khi sai
      alert("Sai tên đăng nhập hoặc mật khẩu");
    }
  };


  return (
    <Paper
        elevation={10}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
        alignSelf: 'center',
        display: "flex",          
        flexDirection: "column",  
        alignItems: "center",
        justifyContent: "space-evenly",
        width: { md: '70%', lg: '60%' },
        height: '55%',
        py: 2,
        mb:15,
        border: '2px solid',
        borderRadius: 8,
    }}
    >
        <Typography 
            variant="h2"
            sx={{
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            fontSize: {  xs: '2rem', md: '3.125rem', lg: '3.5rem' },  
        }} 
        >
            Đăng nhập
        </Typography>
        <input
            placeholder="Tên đăng nhập"
            {...register("name", {required: "Tên đăng nhập không được bỏ trống"})}
            error= {!!errors.name}
            style={ styles.input }
        /> 
        {errors.name && errors.name.message}
        <input
          type="password"
              placeholder="Mật khẩu"
              {...register("password", {required: "Mật khẩu không được bỏ trống"})}
              error={!!errors.password}
              style={ styles.input }
            />
        {errors.password && errors.password.message}
            <Button
              onClick={() => navigate("/forgotpassword")}
              sx={{
                color:"#000000",
                ml:'50%',
                fontSize: '1rem',
                "&:hover": {
                  color: "rgba(0, 0, 0, 0.6)",
            },
              }}
            >
              Quên mật khẩu
            </Button>
            <Button
              variant="outlinedSecondary"
              type="submit"
              color="secondary"
              sx={{
                width: '50%',
                padding: '12px 0px',
                borderRadius: 8,
                fontSize: '1.5rem',
                boxShadow:'5'
              }}
            >
              Đăng nhập</Button> 
            <Button
              variant="outlinedPrimary"
              onClick={() => navigate('/signin')}
              sx={{
                width: '45%',
                padding: '12px 10px',
                borderRadius: 7,
                fontSize: '1.2rem',
                boxShadow:'5'
              }}
            >
              Đăng ký</Button>               
          </Paper>
  );
}