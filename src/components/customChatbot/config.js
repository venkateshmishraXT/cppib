import { apiConfig } from "../../config/apiConfig";

const agentName = "Sarah";

const config = {
  api: {
    protocol: apiConfig.protocol,
    host: apiConfig.host,
    port: apiConfig.port,
    keyForSession: apiConfig.keys.session,
    keyForMessage: apiConfig.keys.message,
  },
  agentName: agentName,
  initialMessages: `Hi! I'm ${agentName} How can I help?`,
};

export default config;
