import {  Grid} from "@mui/material";
import SideBarButtons from "../components/dashboard/SidebarFunction";
import AddGroup from "../components/CreateGroup";
export default function CreateGroup() {
   
    return(
        <Grid container
            display={"flex"}
            justifyContent={"space-between"}
            width={'100vw'}
            height={'100vh'}
            gap={1}
        >   
            <Grid item
                sx={{ flexBasis: { xs: '40px', sm: '50px', md: '60px', lg: '70px' } }}
            >
                <SideBarButtons />
            </Grid>

            <Grid 
                item
                display={'flex'}
                justifyContent={"center"}
                alignItems={"center"}
                flex={1}
                bgcolor={"background.background2"}
                border={"1px solid"}
            >
                <AddGroup />
            </Grid>
        </Grid>
    );
}
