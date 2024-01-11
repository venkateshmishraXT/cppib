import React, { useState, useEffect } from "react";
import { useStream } from "../../providers/stream-provider";
import { useSocket } from "../../providers/socket-provider";
import { useConversations } from "../../providers/conversation-provider";
import { CONVERSATION_STATUS } from "../../constants";
import { getAudioUrl } from "../../utils";
import { getPrompt } from "../../config/apiEndpoints";

const MicButton = ({
  setInputBoxVisibility,
  widgetFilter,
  onStopConversation,
  onSocketResponse,
}) => {
  const { capture, free } = useStream();
  const { socket } = useSocket();
  const [isCapturingAudio, startCaptureAudio] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [conversationStopped, setConversationStopped] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const {
    conversations,
    createConversations,
    updateConversationData,
    stopConversationAudio,
    setActiveConversationId,
    getConversation,
    setActiveAudioFile,
    activeAudioFile,
  } = useConversations();

  const onStartMic = () => {
    setInputBoxVisibility(false);
    stopConversationAudio();
    setConversationStopped(false);
    const conversationId = createConversations();
    setActiveConversationId(conversationId);
    setConversationId(conversationId);
    socket.emit("start-conversation", conversationId);
    capture("audio");
    startCaptureAudio(true);
  };

  const onStopMic = () => {
    setInputBoxVisibility(true);
    updateConversationData(conversationId, {
      status: CONVERSATION_STATUS.WAITING,
    });

    free();
    startCaptureAudio(false);
    onStopConversation();
    setApiResponse(null);
  };

  const onMicClick = () => {
    if (isCapturingAudio) {
      onStopMic();
      return;
    }
    onStartMic();
  };

  useEffect(() => {
    const conversation = getConversation(conversationId) || {};
    if (conversation.recordingStopped && !conversationStopped) {
      setConversationStopped(true);
      console.log("stop conversation");
      socket.emit(
        "stop-conversation",
        conversationId,
        getPrompt(widgetFilter),
        widgetFilter === "Company" ? true : false,
        (response) => {
          const conversationObj = {};
          if (response.text) {
            conversationObj.user = response.text;
          }
          if (response.response?.audioSummary) {
            conversationObj.agent = response.response.audioSummary;
          }
          if (response.userAudioFile) {
            const audioFile = new Audio(getAudioUrl(response.userAudioFile));
            audioFile.crossOrigin = "anonymous";
            conversationObj.userAudioFile = audioFile;
          }

          if (response.answer) {
            conversationObj.agent = response.answer;
          }

          if (response.status == "ok") {
            setApiResponse(response);
          } else if (response.status == "error") {
            onSocketResponse(response.err, response.text);
            conversationObj.status = CONVERSATION_STATUS.COMPLETED;
            if (response.errorAudio) {
              const audioFile = new Audio(response.errorAudio);
              audioFile.play();
              conversationObj.agentAudioFile = audioFile;
            }
          }
          updateConversationData(conversationId, conversationObj);
        }
      );
    }
  }, [conversations, conversationId, conversationStopped]);

  useEffect(() => {
    if (socket) {
      socket.on("audio-answer-available", (conversationId, agentAudioFile) => {
        const audioFile = new Audio(getAudioUrl(agentAudioFile));
        updateConversationData(
          conversationId,
          {
            agentAudioFile: audioFile,
            status: CONVERSATION_STATUS.COMPLETED,
          },
          () => {
            setActiveAudioFile(audioFile);
          }
        );
      });
    }
  }, [socket]);

  useEffect(() => {
    if (activeAudioFile && apiResponse) {
      onSocketResponse(null, apiResponse.text, apiResponse.response);
    }
  }, [activeAudioFile, apiResponse]);

  return (
    <button onClick={onMicClick} className="micBtn">
      {isCapturingAudio ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        </svg>
      ) : (
        <svg
          width="17"
          height="24"
          viewBox="0 0 17 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.9 10.8C16.3556 10.8 16.7322 11.1386 16.7918 11.5778L16.8 11.7V12.3C16.8 16.5713 13.494 20.0705 9.3012 20.378L9.3 23.1C9.3 23.597 8.89704 24 8.4 24C7.94436 24 7.5678 23.6614 7.50816 23.2222L7.5 23.1V20.3782C3.39988 20.0779 0.147396 16.7256 0.00487175 12.5836L0 12.3V11.7C0 11.203 0.402948 10.8 0.9 10.8C1.35564 10.8 1.73219 11.1386 1.79178 11.5778L1.8 11.7V12.3C1.8 15.6924 4.48134 18.4585 7.84032 18.5947L8.1 18.6H8.7C12.0924 18.6 14.8585 15.9187 14.9947 12.5597L15 12.3V11.7C15 11.203 15.403 10.8 15.9 10.8ZM8.4 0C11.0509 0 13.2 2.14903 13.2 4.8V12C13.2 14.6509 11.0509 16.8 8.4 16.8C5.74903 16.8 3.6 14.6509 3.6 12V4.8C3.6 2.14903 5.74903 0 8.4 0ZM8.4 1.8C6.74316 1.8 5.4 3.14315 5.4 4.8V12C5.4 13.6568 6.74316 15 8.4 15C10.0568 15 11.4 13.6568 11.4 12V4.8C11.4 3.14315 10.0568 1.8 8.4 1.8Z"
            fill="#123BB6"
          ></path>
        </svg>
      )}
    </button>
  );
};

export default MicButton;
