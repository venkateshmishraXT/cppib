import { createChatBotMessage } from "react-chatbot-kit";
import { apiConfig } from "./apiConfig";

const botName = "Sarah";

const config = {
  api: {
    protocol: apiConfig.protocol,
    host: apiConfig.host,
    port: apiConfig.port,
    keyForSession: apiConfig.keys.session,
    keyForMessage: apiConfig.keys.message,
    keyForAction: apiConfig.keys.actions,
  },
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName} How can I help?`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "#fff",
    },
    chatButton: {
      backgroundColor: "#fff",
    },
  },
};

export default config;
