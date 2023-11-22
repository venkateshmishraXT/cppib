import React, { useState, useEffect, useCallback } from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import config from "../../config/botConfig";
import { getSession, postMessage, postAction } from "../../config/apiEndpoints";
import "./style.css";

function ChatBoxCustom({
  setState,
  handleAnalysisResponse,
  handleAPILoading,
  handleActionResponse,
  handleActionsLoading,
  selectedAction,
  setIsChatBotRequestStarted,
  setTopGainersData,
  setHandleSpinnerLoading,
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionID, setSession] = useState(null);
  const [dataModelResponse, setDataModelResponse] = useState(null);
  const [widgetFilter, setWidgetFilter] = useState('Other');

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
      try {
        await postMessage(
          config.initialMessages[0].message,
          "agent"
        );
      } catch (error) {
        console.error("initiateAgentChat request error:", error);
        // TODO: display a user-friendly error message
      }
  }, [sessionID]);

  useEffect(() => {
    // fetchSessionID();
    // if (sessionID && !selectedAction) {
    //   initiateAgentChat();
    // }
    // This is invoked when user selects a action pre-populated after API response
    if (selectedAction) {
      handleAPILoading(true);
      setDataModelResponse(selectedAction);
      //getLLMDataByAgent(selectedAction);
      handleAPILoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: selectedAction },
      ]);
      document
        .getElementById("scroll-view")
        .scrollIntoView({ behavior: "smooth" });
    }
  }, [initiateAgentChat, selectedAction]);

  useEffect(() => {
    scrollToLatestChat();
  }, [messages]);

  const scrollToLatestChat = () => {
    const myElement = document.getElementById("scroll-view");
    const topPos = myElement.offsetTop;
    const el = document.querySelector(".messages");
    el.scrollTop = topPos;
  };

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
      if (widgetFilter && widgetFilter == 'Pie') {
        setHandleSpinnerLoading(true);
      } else {
        setIsChatBotRequestStarted(true);
      }
    }
  };

  /**
   * Method name: getLLMDataByAgent
   * Description:  This method responsible to trigger XHR to send the agent message to downstream.
   * Arguments : N/A
   */

  const getLLMDataByAgent = async (selectedAction) => {
    try {
      //const fetchedSessionID = sessionID;
      const agentMessage = selectedAction ? selectedAction : dataModelResponse;
      await postMessage(agentMessage, "agent");
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  const handleFilterChange = (e) => {
    setWidgetFilter(e.target.value);
    console.log('selected filter -- ' + e.target.value);
  };

  /**
   * Method name: getLLMData
   * Description:  This method responsible to trigger XHR to get LLM model data for user from downstream.
   * Arguments : N/A
   */

  const getLLMData = async (newMessage) => {
    console.log('getLLMData custom chat bot started');
    try {
      //const fetchedSessionID = sessionID;
        if (widgetFilter && widgetFilter == 'Pie') {
          setHandleSpinnerLoading(true);
        } else {
          handleAPILoading(true);
          handleActionsLoading(true);
        }
        // const postUserMessage = await postMessage(
        //   newMessage,
        //   "user"
        // );
        // const textAnalysisResponse = postUserMessage ? postUserMessage : "";
        // handleAnalysisResponse(textAnalysisResponse);
        // handleAPILoading(false);
        const textActionResponse = await postAction(
          newMessage,
          "user",
          widgetFilter
        );
        const apiResponse = textActionResponse?.data.choices[0].message.content
        const unescapedApiResponse = apiResponse?.replace(/\\"/g, '"').replace(/\\n/g, '\n');
        const validateResponse = JSON.parse(unescapedApiResponse)
        console.log('response it valid json object' + JSON.stringify(validateResponse));
        if (widgetFilter && widgetFilter == 'Pie') {
          setTopGainersData(validateResponse.content);
          setHandleSpinnerLoading(false);
        } else {
          handleActionResponse(textActionResponse);
        }
        
        handleAPILoading(false);
        handleActionsLoading(false);

        const agentResponse = (textActionResponse.data.choices ? textActionResponse.data.choices[0].message.content : " ");
        //setDataModelResponse(agentResponse);
        const botDefaultResponse = "Your dashboard has been updated with the latest information.";
        
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "bot", text: botDefaultResponse },
        ]);
        return agentResponse;
    } catch (error) {
      const botErrorResponse = "I am facing connectivity issue, please try again later.";
      const botRetryResponse = "Not able to find any relevant data, please refine your query for better experiance.";
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: botRetryResponse },
      ]);
      handleAPILoading(false);
      handleActionsLoading(false);
      console.error("API request error:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
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
      <div className="filters">
        <h4>Widget Filters</h4>
        <ul>
        <li>
            <input id="Pie" type="radio" value="Pie" name="filters" onChange={handleFilterChange} checked={widgetFilter === 'Pie'} />
            <label htmlFor="Pie">Previous investment memo trends</label>
          </li>
          <li>
            <input id="Company" type="radio" value="Company" name="filters" onChange={handleFilterChange} checked={widgetFilter === 'Company'} />
            <label htmlFor="Company">Company Insight</label>
          </li>
          <li>
            <input id="Other" type="radio" value="Other" name="filters" onChange={handleFilterChange} checked={widgetFilter === 'Other'} />
            <label htmlFor="Other">Ask Investment Assistant</label>
          </li>
        </ul>
      </div>
      <div className="chatbox">
        <div className="messages">
          {messages.map((message, idx) => (
            <div className={
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
          <img src="/assets/chatbot.svg" alt="chat bot" />
        </div>
        <div className="input-area">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder= {widgetFilter == 'Company' ? "Please enter company name" : "Ask insights from your AI Assistant"} 
          />
          {/*<button onClick={handleUserMessage}>&gt;&gt;</button>*/}
        </div>
      </div>
    </div>
  );
}

export default ChatBoxCustom;
