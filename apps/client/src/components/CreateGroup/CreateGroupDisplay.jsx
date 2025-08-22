import {  Box, Button, OutlinedInput,  Typography } from "@mui/material";
import React, { useState, useMemo, useEffect } from "react";
import {debounce} from "lodash"
const formBoxSx = {
    width: { md: '60%', lg: '50%' },
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 5,
    bgcolor: "#ade8f4",
    border: "1px solid",
    p: 5,
    boxShadow: '10'
};
function CreateDisplay ({onChange, setShowAddMembers, handleCreateGroup}) {
    const [groupName, setGroupName] = useState("")
    const debounceSetName = useMemo(
        () => debounce((value) => onChange(value),400)  
    ,[onChange])
    useEffect(() => {
    return () => debounceSetName.cancel();
    }, [debounceSetName]);
    return (
        <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        bgcolor={"background.paper2"}
        sx={formBoxSx}
        gap={4}
        >
            <Typography
                variant="h2"
                sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    fontSize: {
                        xs: '2rem', 
                        md: '3.125rem', 
                        lg: '3.5rem'
                    },
                    my : 2,
                }} 
            >
                Tạo nhóm
            </Typography>
            <OutlinedInput
                value={groupName}
                onChange={(e) => {
                    setGroupName(e.target.value)
                    debounceSetName(e.target.value)
                }}
                placeholder="Tên nhóm"

                    sx={{ 
                    width: '75%',
                    '& .MuiOutlinedInput-root': {
                    border: '1px solid',
                    borderRadius: 6,
                    padding:1,
                     },
                    borderRadius: 6
                 }}
            />

            <Button
                onClick={() => setShowAddMembers()}
                variant="outlinedSecondary"
                sx={{
                    width: {
                        md: '60%',
                        lg: '40%'
                    },
                    p: 2,
                    fontSize: '1.2rem'
                }}
            >
                Thêm thành viên
            </Button>
            <Button
                onClick={() => {
                    handleCreateGroup()
                    setGroupName("");
                }}
                variant="outlinedPrimary"
                sx={{
                    width: {
                        md: '60%',
                        lg: '40%'
                    },
                    height: 'auto',
                    p: 2,
                    fontSize: '1.2rem'
                }}>
                Tạo nhóm
            </Button>
        </Box>
    )
}
export default React.memo(CreateDisplay)