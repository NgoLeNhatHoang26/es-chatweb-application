import { Box, Grid, Typography} from "@mui/material";
import login from "../components/asset/Login-welcome.svg"
import {  useEffect} from "react";
import { useUser } from "../context/UserContext";
import LoginBox from "../components/dashboard/LoginBox";
export default function Login() {
  const {setCurrentUser} = useUser()
  useEffect(()=> {
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    } else {
      setCurrentUser({id: 0, name: ""})
    }
  },[setCurrentUser])

  return (
    <Grid container
      height={'100vh'}
      width={'100vw'}
      bgcolor={'background.default'}
      overflow={'hidden'}
    >
      <Grid item 
        size={{xs: 0, sm: 4, lg : 7 }}
      >
        <Box
            bgcolor={"background.paper2"}
            component= "img"
            src={login}
            alt = "welcome"
            sx={{ width: '100%', height: '100%'}}
            maxHeight={'100vh'}
        />
      </Grid>
      <Grid
        item
        size={{ xs: 12, sm: 8, lg : 5 }}
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
      >
          <Typography  
              variant="h1"
              ml={8} mb={3}
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                fontSize: {  xs: '4.875rem', md: '6.125rem', lg: '7rem' }
              }}
            >
              WitChat
            </Typography>
        <LoginBox />
      </Grid>
    </Grid>
  );
}
