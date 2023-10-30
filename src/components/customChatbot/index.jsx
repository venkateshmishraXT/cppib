import React, { useState, useEffect, useCallback } from "react";
import config from "../../config/botConfig";
import { getSession, postMessage, postAction } from "../../config/apiEndpoints";
import "./style.css";

function ChatBoxCustom({
  handleAnalysisResponse,
  handleAPILoading,
  handleActionResponse,
  handleActionsLoading,
  selectedAction,
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionID, setSession] = useState(null);
  const [dataModelResponse, setDataModelResponse] = useState(null);

  /**
   * Method name: fetchSessionID
   * Description:  This method triggers xhr to get initial session ID and set to local state
   * Arguments : N/A
   */

  const fetchSessionID = useCallback(async () => {
    if (!sessionID) {
      try {
        const fetchedSessionID = await getSession();
        setSession(fetchedSessionID);
      } catch (error) {
        console.error("fetchSessionID request error:", error);
        // TODO: display a user-friendly error message
      }
    }
  }, [sessionID]);

  /**
   * Method name: initiateAgentChat
   * Description:  This method triggers xhr to get send the initial bot message to downstreams
   * Arguments : N/A
   */

  const initiateAgentChat = useCallback(async () => {
    if (sessionID) {
      try {
        await postMessage(
          sessionID,
          config.initialMessages[0].message,
          "agent"
        );
      } catch (error) {
        console.error("initiateAgentChat request error:", error);
        // TODO: display a user-friendly error message
      }
    }
  }, [sessionID]);

  useEffect(() => {
    fetchSessionID();
    if (sessionID && !selectedAction) {
      initiateAgentChat();
    }
    // This is invoked when user selects a action pre-populated after API response
    if (selectedAction) {
      handleAPILoading(true);
      setDataModelResponse(selectedAction);
      getLLMDataByAgent(selectedAction);
      handleAPILoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: selectedAction },
      ]);
      document
        .getElementById("scroll-view")
        .scrollIntoView({ behavior: "smooth" });
    }
  }, [fetchSessionID, initiateAgentChat, sessionID, selectedAction]);

  /**
   * Method name: handleUserMessage
   * Description:  This method triggers when user clicks on send button after entering a message and it get set in react local state.
   * Arguments : N/A
   */

  const handleUserMessage = () => {
    if (input.trim() !== "") {
      //set the messages in react local state
      setMessages([...messages, { type: "user", text: input.trim() }]);
      // trigger XHR call to get LLM modal data from downstream.
      getBotResponse(input.trim());
      setInput("");
    }
  };

  /**
   * Method name: getLLMDataByAgent
   * Description:  This method responsible to trigger XHR to send the agent message to downstream.
   * Arguments : N/A
   */

  const getLLMDataByAgent = async (selectedAction) => {
    try {
      const fetchedSessionID = sessionID;
      const agentMessage = selectedAction ? selectedAction : dataModelResponse;
      await postMessage(fetchedSessionID, agentMessage, "agent");
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  /**
   * Method name: getLLMData
   * Description:  This method responsible to trigger XHR to get LLM model data for user from downstream.
   * Arguments : N/A
   */

  const getLLMData = async (newMessage) => {
    try {
      const fetchedSessionID = sessionID;
      if (fetchedSessionID) {
        handleAPILoading(true);
        const textAnalysisResponse = await postMessage(
          fetchedSessionID,
          newMessage,
          "user"
        );
        handleAnalysisResponse(textAnalysisResponse);
        handleAPILoading(false);

        handleActionsLoading(true);
        const textActionResponse = await postAction(
          fetchedSessionID,
          newMessage,
          "user"
        );
        handleActionResponse(textActionResponse);
        handleActionsLoading(false);

        const agentResponse = textActionResponse.data.actions[0].information;
        setDataModelResponse(agentResponse);
        return agentResponse;
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // 👇 Get input value
      handleUserMessage();
    }
  };

  /**
   * Method name: getBotResponse
   * Description:  This method invoke getLLMData XHR to get LLM model data for user from downstream.
   * Arguments : message { @string }
   */

  const getBotResponse = (message) => {
    return getLLMData(message);
  };

  return (
    <div className="App">
      <div className="chatbox">
        <div className="messages">
          {messages.map((message, idx) => (
            <div
              className={
                message.type === "bot" ? "bot-container1" : "user-container"
              }
            >
              {message.type === "bot1" && (
                <div className="bot-avatar">
                  B
                </div>
              )}

              <div key={idx} className={`message ${message.type}`}>
                <div className="bubble">
                  {message.type === "user" && (
                    <div className="user-avatar">
                      <div className="user-icon">
                        <span>SR</span>
                      </div>
                    </div>
                  )}
                  <div className="message-text">{message.text}</div>
                  
                </div>
              </div>
            </div>
          ))}
          <span id="scroll-view"></span>
        </div>
        <div className="botIcon">
          <img src="../src/assets/chatbot.svg" alt="chat bot" />
        </div>
        <div className="input-area">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask insights from your AI Assistant"
          />
          {/*<button onClick={handleUserMessage}>&gt;&gt;</button>*/}
        </div>
      </div>
    </div>
  );
}

export default ChatBoxCustom;
