import { createChatBotMessage } from "react-chatbot-kit";
import { apiConfig } from "./apiConfig";

const botName = "Agent Neo!";

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
      backgroundColor: "#00864f",
    },
    chatButton: {
      backgroundColor: "#00864f",
    },
  },
};

export default config;
