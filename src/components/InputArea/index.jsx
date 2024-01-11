import React, { useState } from "react";
import MicButton from "../MicButton";
import AudioVisualiser from "../AudioVisualiser";

const InputArea = ({ input, onChange, onKeyDown, placeholder, widgetFilter, onStopConversation, onSocketResponse }) => {
  const [inputVisibility, setInputBoxVisibility] = useState(true);
  return (
    <div className="input-area">
      {inputVisibility ? (
        <input
          value={input}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
      ) : (
        <AudioVisualiser />
      )}
      <MicButton setInputBoxVisibility={setInputBoxVisibility} widgetFilter={widgetFilter} onStopConversation={onStopConversation} onSocketResponse={onSocketResponse}  />
    </div>
  );
};

export default InputArea;
