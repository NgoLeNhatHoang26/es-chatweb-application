import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import User from "../chat/common/User"
import { useUser } from "../../context/UserContext";
export default function AddMembers({onSend, users}) {
    const [isChosen, setIsChosen] = useState([])
    const {currentUser} = useUser()
    useEffect(() => {
        onSend(isChosen)
    },[isChosen])

    const handleChooseAll = () => {
        users.forEach(user => setIsChosen(prev => [...prev,user.id]))
    }
    return(
        <Box
        flexDirection="column"
        alignItems="center"
        display="flex"
        bgcolor={"background.paper2"}
        sx={{
            width: {
                md: '60%',
                lg: '50%'
            },
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            borderRadius: 5,
            bgcolor: "#ade8f4",
            border: "1px solid",
            p: 2,
            boxShadow: '10',
            gap: 2
        }}
        >
            <Box
                bgcolor={"background.paper3"}
                sx={{
                    width: '90%',
                    height: "400px",
                    p: 0.5,
                    overflowY: 'scroll',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#dcdcdc',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#555',
                        maxLines: 2,
                        borderRadius: '8px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#333',
                    },
                }}
            >
            {
                users.map(user => {
                    if (user.id !== currentUser.id && user.type === "user"){
                        return (
                            <Button
                            onClick={() => {
                                setIsChosen((prev =>
                                prev.includes(user.id)
                                    ? prev.filter(keptUsers => keptUsers !== user.id)
                                    : [...prev, user.id])
                                )
                            }}
                            key={user.id}
                            sx={{
                                display: 'flex',
                                justifyContent:'start',
                                borderRadius:'0',
                                width:'100%',
                                bgcolor: isChosen.includes(user.id) ? "background.paper" : ""
                            }}
                            >
                                <User 
                                    avatar={user.avatar}
                                    name={user.name}
                                />      
                            </Button>
                    )}
                }
            )}      
            </Box>
            <Button
                onClick={handleChooseAll}
                variant="outlinedSecondary"
                sx={{
                    width:{
                        md: '40%',
                        lg: '30%'
                    },
                    py: 2,
                    fontSize:'1.1rem',
                    alignSelf:'center'
                }}  
            >
                Chọn tất cả
            </Button>
            <Button
                onClick={() => setIsChosen([])}
                variant="outlinedPrimary"
                sx={{
                    width:{
                        md: '40%',
                        lg: '30%'
                    },
                    py: 2,
                    fontSize:'1.1rem',
                    alignSelf:'center'
                }}
            >
                Hủy tất cả
            </Button>
        </Box>
    );
}