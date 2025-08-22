import { Avatar, Box, Typography } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
export default function MessageBox({ isSender,name, avatar, type, content, time }) {
   const avatarElement =(
    <Avatar
      src={avatar|| undefined}
      alt="User Avatar"
      sx={{
        width: avatar ? {md: "3vw", lg: "2vw"} : "50px",
        height: avatar ? {md: "3vw", lg: "2vw"} : "50px",
        border: avatar ? "1px solid" : "2px solid",
        borderColor:avatar ? undefined : "#000000",
      }}
    >
      {!avatar && <PermIdentityIcon />}
    </Avatar>
    );
  const messageContainerStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "40vw",
    borderRadius: 6,
  };
  return (
    <Box display="flex" gap={2} flexDirection={isSender ? "row-reverse" : "row"} alignItems={"flex-end"}>
      <Box pb={1}>{avatarElement}</Box>
      <Box display={"flex"} flexDirection={"column"}>
        <Typography
          variant="caption"
          alignSelf= {isSender ? "end":"start"  }
          fontSize="0.8rem"
           p="5px"
        >
          {name}
        </Typography>
        {type === "text" ? (
          <Box
            {...messageContainerStyle}
            bgcolor={isSender ? "messageBubble.out" : "messageBubble.in"}
            px={2}
            pt={2}
            border="1px solid #000000"
            sx={{
              overflowWrap: "break-word",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
              textAlign: "left",
            }}
          >
            <Typography
              variant="body1"
              fontSize="1rem"
              color={isSender ? "white" : "inherit"}
            >
              {content}
            </Typography>
            <Typography
              variant="caption"
              alignSelf= {isSender ? "start" : "end"}
              fontSize="0.8rem"
              p="5px"
            >
              {time}
            </Typography>
          </Box>
        ) : (
          <Box {...messageContainerStyle}>
            <img
              src={content}
              alt="Attached"
              style={{ width:"25vw", borderRadius: "8px", alignSelf:"end" }}
            />
            <Typography
              variant="caption"
              alignSelf= {isSender ? "start" : "end"}
              fontSize="0.8rem"
              p="5px"
            >
              {time}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
