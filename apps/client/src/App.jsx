import { useEffect, lazy, Suspense } from 'react';
import socket from './socket';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUser } from './context/UserContext'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const Login = lazy(() => import("./pages/Login"));
const TrangChu = lazy(() => import('./pages/TrangChu'))
const Signin = lazy(() => import("./pages/Signin"))
const CurrentChatProfile = lazy(() => import("./pages/CurrentChatProfile"))
const Profile= lazy(() => import("./pages/Profile"))
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"))
const CreateGroup = lazy(() => import("./pages/CreateGroup"))

function App() {
  const {currentUser} = useUser();
  const queryClient = new QueryClient();
  useEffect(() => {
  socket.connect();
  if(currentUser.id !== 0 )  {
    socket.emit("join", currentUser.id)
    socket.on("connect", () => {
      console.log("✅ Socket connected: ",  currentUser.id);
  })
  }
  return () => socket.disconnect();
  }, [currentUser]);
    return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<TrangChu />} />
                <Route path="/userprofile" element={<Profile />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/chatprofile" element={<CurrentChatProfile />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path='/creategroup' element={<CreateGroup />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
    );
}

export default App;
