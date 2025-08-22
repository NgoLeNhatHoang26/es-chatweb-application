import { createContext, useContext, useRef, useState } from "react";

const MessagesContext = createContext({
  messages: [],
  setMessages: (messages) => {},
  messagesRefs: { current: {} },
  scrollToMessage: (id) => {}
});

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const messagesRefs = useRef({});
  const pendingScrollId = useRef(null);

  const scrollToMessage = (id) => {
    const el = messagesRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      pendingScrollId.current = id;
    }
  };

  return (
    <MessagesContext.Provider
      value={{ messages, setMessages, messagesRefs, scrollToMessage }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => useContext(MessagesContext);
