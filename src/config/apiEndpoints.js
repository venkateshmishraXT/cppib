import axios from "axios";
import { apiConfig, apiConfigIngest } from "../config/apiConfig";

const apiUrl = `${apiConfig.protocol}://${apiConfig.host}${apiConfig.port}/api`;
const apiUrlIngest = `${apiConfig.protocol}://${apiConfigIngest.host}${apiConfigIngest.port}/api`;

export const getSession = async () => {
  try {
    const response = await axios.get(`${apiUrl}/session`, {
      headers: {
        "x-functions-key": apiConfig.keys.session,
      },
    });
    return response.data.session;
  } catch (error) {
    console.error("getSession ID request error:", error);
    throw error;
  }
};

export const postMessage = async (
  currentSessionID,
  newMessage,
  currentSpeaker
) => {
  try {
    const response = await axios.post(
      `${apiUrl}/message?${currentSpeaker}`,
      {
        sessionID: currentSessionID,
        speaker: currentSpeaker,
        message: newMessage,
      },
      {
        headers: {
          "x-functions-key": apiConfig.keys.message,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("postMessage API error:", error);
    throw error;
  }
};

export const postAction = async (
  currentSessionID,
  newMessage,
  currentSpeaker
) => {
  try {
    const response = await axios.post(
      `${apiUrl}/message-actions`,
      {
        sessionID: currentSessionID,
        speaker: currentSpeaker,
        message: newMessage,
      },
      {
        headers: {
          "x-functions-key": apiConfig.keys.actions,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("postActions API error:", error);
    throw error;
  }
};

export const uploadFile = async (formData) => {
  try {
    const response = await axios.post(`${apiUrlIngest}/upload`, formData, {
      headers: {
        "x-functions-key": apiConfigIngest.keys.upload,
      },
    });
    return response;
  } catch (error) {
    console.error("uploadFile API error:", error);
    throw error;
  }
};

export const crawlURL = async (url) => {
  try {
    const response = await axios.post(
      `${apiUrlIngest}/crawl`,
      {
        source_url: url,
      },
      {
        headers: {
          "x-functions-key": apiConfigIngest.keys.upload,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("crawlURL API error:", error);
    throw error;
  }
};
