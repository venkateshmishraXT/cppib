import React, { useEffect, useState } from "react";
import Recorder from "../../utils/recorder";
import { useSocket } from "../../providers/socket-provider";
import { useStream } from "../../providers/stream-provider";
import { useConversations } from "../../providers/conversation-provider";

let recorder;

const RecordingManager = () => {
  const { socket } = useSocket();
  const { stream } = useStream();
  const {getActiveConversation, updateConversationData} = useConversations();
  
  useEffect(() => {
    const activeConversation = getActiveConversation();
    if (stream === null) {
      if (recorder) {
        recorder.stop(() => {
          recorder = null;
          console.log("recorder stopped", activeConversation.id);
          updateConversationData(activeConversation.id, {
            recordingStopped: true,
          });
        });
      }
      return
    }
    if(socket){
      recorder = new Recorder(socket, stream, activeConversation.id);
      console.log("recorder started", activeConversation.id);
    }
  }, [stream, socket]);

  return null;
};

export default RecordingManager;
