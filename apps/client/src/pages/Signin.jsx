import { Box, Grid} from "@mui/material";
import login from "../components/asset/Login-welcome.svg"
import SigninBox from "../components/dashboard/SigninBox";
export default function Signin() {
  return (
    <Grid container
      height={'100vh'}
      width={'100vw'}
      bgcolor={'background.default'}
      overflow={'hidden'}
    >
      <Grid item 
        size={{
          xs: 0,
          sm: 4,
          lg : 7
        }}
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
      <Grid item
          display="flex"
          size={{ xs: 10, sm : 8,  lg : 5  }}
          flexDirection="column"
          justifyContent="center"
      >         
        <SigninBox />
        </Grid> 
    </Grid>
  );
}
