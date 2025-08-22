import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0077b6", // Honolulu Blue - Nút chính, Sidebar, Icon
    },
    secondary: {
      main: "#48cae4", // Vivid Sky Blue - Nút phụ, nút gửi tin
    },
    background: {
      default: "#ffffff", // Light Cyan - Background tổng thể
      background2: "#dff8fb", // Light Cyan 2 - Background của các khung
      paper3: "#f2fdfe",
      paper2: "#ade8f4", // Non-photo Blue - Background của các khung
      paper: "#80d0e8", // Non-photo Blue 2 - Khung hộp (login/chat)
      neutral: "#90e0ef", // Non-photo Blue - Input hoặc header
    },
    text: {
      primary: "#03045e", // Federal Blue - Tiêu đề, nội dung chính
      secondary: "#023e8a", // Marian Blue - Nội dung phụ
      content: "#0077b6", // Nội dung tin nhắn
      disabled: "#90e0ef", // Input không hoạt động
    },
    success: {
      main: "#27AE60", // Trạng thái online
    },
    error: {
      main: "#E74C3C",
    },
    warning: {
      main: "#F39C12",
    },
    divider: "#D9D9D9",
    messageBubble: {
      out: "#0096c7", // Blue Green - Tin nhắn gửi đi
      in: "#c7f4f9", // Vivid Sky Blue - Tin nhắn đến
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 20px",
          borderBlockColor: "#000000",
        },
        outlinedPrimary: {
          backgroundColor: "#ffffff",
          color: "#000000",
          "&:hover": {
            backgroundColor: "#e0e4e4ff",
          },
          borderColor: "#000000",
        },
        outlinedSecondary: {
          backgroundColor: "#0077b6",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "rgba(0, 119, 182, 0.7)",
          },
          borderColor: "#000000",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          height: "50px",
          width: "50px",
          backgroundColor: "#0077b6",
          border: "1px solid #ffffff",
          color: "white",
          "&:hover": {
            backgroundColor: "#b5b2b2ff",
          },
        },
      },
    },
    MuiOutlinedInput:{
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#000000",
          "& .MuiOutlinedInput-root": {
            borderRadius: 6,
            fontSize: 20,
            padding: 1,
            colors: "#000000"
          },
          borderRadius: 6,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#000000",
          "& .MuiOutlinedInput-root": {
            borderRadius: 6,
            fontSize: 20,
            padding: 1,
            colors: "#000000"
          },
          borderRadius: 6,
        },
        secondary: {

          "& .MuiOutlinedInput-root": {
          border: '1px solid',
          borderRadius: 6,
          padding:1,
          },
          borderRadius: 6
          
        },
      },
    },
  },
});

export default theme;
