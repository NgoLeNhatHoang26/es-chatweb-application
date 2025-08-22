import { UserProvider } from "./UserContext";
import { ChatTargetProvider } from "./ChatTargetContext";
import { MessagesProvider } from "./MessageContext";

function ChatProviders({ children }) {
  return (
    <UserProvider>
      <ChatTargetProvider>
        <MessagesProvider>{children}</MessagesProvider>
      </ChatTargetProvider>
    </UserProvider>
  );
}

export default ChatProviders;
