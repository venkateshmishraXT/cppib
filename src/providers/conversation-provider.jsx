import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { generateSessionId } from "../utils";
import { useSocket } from "./socket-provider";
import { CONVERSATION_STATUS } from "../constants";

const ConversationContext = createContext({
  conversations: [],
  activeAudioFile: null,
  activeConversationId: null,
});

export const ConversationProvider = ({ children }) => {
  const { socket } = useSocket();
  const [conversations, setConversations] = useState([]);
  const [activeAudioFile, setActiveAudioFile] = useState(null);
  const [activeConversationId, setActiveConversationId] = useState(null);

  const getConversation = (conversationId) => {
    return conversations.filter((record) => record.id === conversationId)[0];
  };

  const updateConversationData = (conversationId, data, callback) => {
    setConversations((records) => {
      const conversation = records.filter((record) => record.id === conversationId)[0];
      if (conversation.status === CONVERSATION_STATUS.CANCELLED) {
        return records;
      }
      const newRecords = records.map((record) =>
        record.id === conversationId ? { ...record, ...data } : record
      );
      typeof callback === "function" && callback(newRecords);
      return newRecords;
    });
  };

  const playConversationAudio = (id, userType) => {
    const conversation = getConversation(id);
    let audioFile = conversation.userAudioFile;
    if (userType === "agent") {
      audioFile = conversation.agentAudioFile;
    }
    setActiveAudioFile(audioFile);
  };

  const stopConversationAudio = () => {
    setActiveAudioFile((audioFile) => {
      if (audioFile) {
        audioFile.pause();
        audioFile.currentTime = 0;
      }
      return null;
    });
  };

  const getActiveConversation = () => {
    return getConversation(activeConversationId);
  };

  const onActiveAudioStopped = useCallback(() => {
    setActiveAudioFile(null);
  }, []);

  useEffect(() => {
    if (activeAudioFile) {
      activeAudioFile.removeEventListener("pause", onActiveAudioStopped);
      activeAudioFile.play().catch((error) => {
        setActiveAudioFile(null);
        console.error("Error playing audio:", error);
      });
      activeAudioFile.addEventListener("pause", onActiveAudioStopped);
    }
  }, [activeAudioFile]);

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        setConversations,
        activeAudioFile,
        playConversationAudio,
        stopConversationAudio,
        updateConversationData,
        setActiveConversationId,
        getActiveConversation,
        getConversation,
        setActiveAudioFile
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversations = () => {
  const {
    conversations,
    setConversations,
    activeAudioFile,
    playConversationAudio,
    stopConversationAudio,
    updateConversationData,
    setActiveConversationId,
    getActiveConversation,
    getConversation,
    setActiveAudioFile
  } = useContext(ConversationContext);

  const createConversations = () => {
    const conversationId = generateSessionId();
    setConversations([
      ...conversations,
      {
        id: conversationId,
        user: "",
        agent: "",
        time: Date.now(),
        userAudioFile: null,
        agentAudioFile: null,
        status: CONVERSATION_STATUS.STARTED,
        recordingStopped: false
      },
    ]);
    return conversationId;
  };

  return {
    conversations,
    createConversations,
    updateConversationData,
    playConversationAudio,
    stopConversationAudio,
    setActiveConversationId,
    getActiveConversation,
    getConversation,
    setActiveAudioFile,
    activeAudioFile
  };
};
