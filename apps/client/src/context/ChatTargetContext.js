import { createContext, useContext, useState, useEffect } from "react";

const ChatTargetContext = createContext({
    currentChatWith: { id: 0, name: "" },
    setCurrentChatWith: (user) => {}
});

export const ChatTargetProvider = ({ children }) => {
  const [currentChatWith, setCurrentChatWith] = useState(() => {
    const savedChat = localStorage.getItem("currentChatWith");
    return savedChat ? JSON.parse(savedChat) : { id: 0, name: "" };
  });

  useEffect(() => {
    localStorage.setItem("currentChatWith", JSON.stringify(currentChatWith));
  }, [currentChatWith]);

  return (
    <ChatTargetContext.Provider value={{ currentChatWith, setCurrentChatWith }}>
      {children}
    </ChatTargetContext.Provider>
  );
};

export const useChatTarget = () => useContext(ChatTargetContext);
