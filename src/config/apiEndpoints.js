import axios from "axios";
import { apiConfig, apiConfigIngest } from "./apiConfig";

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
  newMessage,
  currentSpeaker
) => {
  try {
    const response = await axios.post(
      `${apiUrl}/message?${currentSpeaker}`,
      {
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
    const response = {};
    return response;
    //console.error("postMessage API error:", error);
    //throw error;
  }
};

export const postAction = async (
  newMessage,
  currentSpeaker
) => {
  try {
    const response = await axios.post(
      // `${apiUrl}/message-actions`,
      `https://3592-93-186-144-66.ngrok-free.app/v1/analyze`,
      // {
      //   sessionID: currentSessionID,
      //   speaker: currentSpeaker,
      //   query: newMessage,
      // },
      {
        "messages": [{
          "role": currentSpeaker,
          "content": newMessage
        },
        {
          "role": "system",
          // "content": "You are an advanced AI healthcare investment analyst, specializing in processing diverse un-structured data related to companies,including company statistics, technology trends, and more. Your primary objective is to extract valuable insights and patterns from this data to assist users in making informed investment decisions. Analyze the provided dataset and respond to user queries with precise and actionable insights derived from the data. Generate a response in the following format: { \"content_format\": \"json | paragraph | list\",  \"content\": \"Your response in the specified format\" }. If response contains data that should be structured as timeseries, format it as follows: {\"content_format\": \"json\",\"content\": {\"year\":\"2018\",\"data\": \"100\"}}. If the response is in paragraph form, use the following structure:{\"content_format\": \"paragraph\",\"content\": \"Your response as a paragraph.\"}.If the response should be presented as a bulleted list, provide it like this:{\"content_format\": \"list\",\"content\": [\"Item 1\", \"Item 2\", \"Item 3\"]}"
          // "content": "You are an advanced AI healthcare investment analyst, specializing in processing diverse un-structured data related to companies, including company statistics, technology trends, and more. Your primary objective is to extract valuable insights and patterns from this data to assist users in making informed investment decisions. Analyze the provided dataset and respond to user queries with precise and actionable insights derived from the data. Generate a response in the following format: { \"content_format\": \"json | paragraph | list\",  \"content\": \"Your response in the specified format\" }. If response contains data that should be structured as timeseries, format it as follows: {\"content_format\": \"json\",\"content\": {\"year\":\"2018\",\"data\": \"100\"}}. If the response is in paragraph form, use the following structure:{\"content_format\": \"paragraph\",\"content\": {\"heading\":\"heading of the summary\",\"data\": \"Your response as a paragraph and highlight keywords in it.\", \"keyHighlight\": \"Provide key takeaways in bullet list for quick user consumption \"}} .If the response should be presented as a bulleted list, provide it like this:{\"content_format\": \"list\", \"content\": {\"heading\":\"heading of the list\",\"intro\":\"opening statement for the response \",\"data\": \"provide ordered list of items\", \"summary\": \"provide extensive summary relevent for the response\"}}}}}"
          // "content": "You are an advanced investment analyst, specializing in processing diverse unstructured data related to the company, including company statistics, technology trends, revenue data and insights and key highlights. Your primary objective is to extract valuable insights and patterns from this data to assist users in making informed investment decisions.Analyze the provided dataset and respond to user queries with precise and actionable insights derived from the data. Please highlight keywords in the response. Generate a response in the following format: { \"content_format\": \"json | paragraph | list\",  \"content\": \"Your response in the specified format\" }. If response contains data that should be structured as timeseries, format it as follows: {\"content_format\": \"json\",\"content\": {{\"year\":\"2018\",\"data\": \"100\"},\"Summary\": \"Provide summary for the response \"}}. If the response is in paragraph form, use the following structure:{\"content_format\": \"paragraph\",\"content\": {\"heading\":\"heading of the summary\",\"data\": \"Your response as a paragraph and highlight keywords in it.\", \"keyHighlight\": \"Provide key takeaways in ordered list of items \"}} .If the response should be presented as a bulleted list, provide it like this:{\"content_format\": \"list\", \"content\": {\"heading\":\"heading of the list\",\"intro\":\"opening statement for the response \",\"data\": \"provide ordered list of items\", \"summary\": \"provide extensive summary relevant for the response\"}}}}}"
          //"content": "You are an advanced investment analyst, specializing in processing diverse unstructured data related to the company, including company statistics, technology trends, revenue data and insights and key highlights. Your primary objective is to extract valuable insights and patterns from this data to assist users in making informed investment decisions.Analyze the provided dataset and respond to user queries with precise and actionable insights derived from the data. Please highlight keywords in the response. Generate a response in the following format: { \"content_format\": \"json | paragraph | list\",  \"content\": \"Your response in the specified format\" }. If response contains data that should be structured as timeseries, format it as follows: {\"content_format\": \"json\",\"content\": {\"data\":\"[{\"date\":\"2018\",\"value\": \"100\"}]\",\"Summary\": \"Provide summary for the response \",\"heading\":\"provide title for the response\",\"axisinfo\": {\"xaxis\":\"\",\"yaxis\": \"\"}}}. If the response is in paragraph form, use the following structure:{\"content_format\": \"paragraph\",\"content\": {\"heading\":\"heading of the summary\",\"data\": \"Your response as a paragraph and highlight keywords in it.\", \"keyHighlight\": \"Provide key takeaways in ordered list of items \"}} .If the response should be presented as a bulleted list, provide it like this:{\"content_format\": \"list\", \"content\": {\"heading\":\"heading of the list\",\"intro\":\"opening statement for the response \",\"data\": \"provide ordered list of items\", \"summary\": \"provide extensive summary relevant for the response\"}}}}}"
          //"content": "You are an advanced investment analyst, specializing in processing diverse unstructured data related to the company, including company statistics, technology trends, revenue data and insights and key highlights. Your primary objective is to extract valuable insights and patterns from this data to assist users in making informed investment decisions.Analyze the provided dataset and respond to user queries with precise and actionable insights derived from the data. Please highlight keywords in the response. Generate a response in the following format: { \"content_format\": \"timeseries | paragraph | list| timeseries-multi\",  \"content\": \"Your response in the specified format\" }. If response contains data that should be structured as timeseries, format it as follows and amke sure the response is complete and complient to the format and don't rush into it: {\"content_format\": \"timeseries\",\"content\": {\"Heading\":\"heading for the timeseries data\",\"data\":\"[{\"date\":\"2018\",\"value\": \"100\"}]\",\"Summary\": \"Provide summary for the response \",\"axisinfo\": {\"xaxis\":\"\",\"yaxis\": \"\"}}}.  If response contains data that should be structured as timeseries format and it has data about multiple comapnies,format it as follows and make sure the response is complete and complient to the format and don't rush into it: {\"content_format\": \"timeseries-multi\",\"content\": {\"Heading\":\"heading for the timeseries data\",\"data\":\"[{\"date\":\"2018\",{\"value1\": \"100\",\"Label\": \"Company Name\",\"value2\": \"100\",\"Label\": \"Company Name\"}]\",\"Summary\": \"Provide summary for the response \",\"axisinfo\": {\"xaxis\":\"\",\"yaxis\": \"\"}}}.If the response is in paragraph form, use the following structure:{\"content_format\": \"paragraph\",\"content\": {\"heading\":\"heading of the summary\",\"data\": \"Your response as a paragraph and highlight keywords in it.\", \"keyHighlight\": \"Provide key takeaways in ordered list of items if it provide some additonal insights to response otherwise don't provide \"}} .If the response should be presented as a bulleted list, provide it like this:{\"content_format\": \"list\", \"content\": {\"heading\":\"heading of the list\",\"intro\":\"opening statement for the response \",\"data\": \"provide ordered list of items\", \"summary\": \"provide extensive summary relevant for the response\"}}}}}"
          "content": "You are an advanced investment analyst, specializing in processing diverse unstructured data related to the company, including company statistics, technology trends, revenue data and insights and key highlights. Your primary objective is to extract valuable insights and patterns from this data to assist users in making informed investment decisions.Analyze the provided dataset and respond to user queries with precise and actionable insights derived from the data. Please highlight keywords in the response. Generate a response in the following format: { \"content_format\": \"timeseries | paragraph | list| timeseries-multi | Tabular\",  \"content\": \"Your response in the specified format\" }. If response contains data that should be structured as timeseries, format it as follows and amke sure the response is complete and complient to the format and don't rush into it: {\"content_format\": \"timeseries\",\"content\": {\"Heading\":\"heading for the timeseries data\",\"data\":\"[{\"date\":\"2018\",\"value\": \"100\"}]\",\"Summary\": \"Provide summary for the response \",\"axisinfo\": {\"x-axis\":\"\",\"y-axis\": \"\"}}}.  If response contains data that should be structured as timeseries format and it has data about multiple comapnies,format it as follows and make sure the response is complete and complient to the format and don't rush into it: {\"content_format\": \"timeseries-multi\",\"content\": {\"Heading\":\"heading for the timeseries data\",\"data\":\"[{\"date\":\"2018\",{\"Value1\": \"100\",\"Label\": \"Company Name\"},{\"Value2\": \"100\",\"Label\": \"Company Name\"}}]\",\"Summary\": \"Provide key insights for the response \",\"axisinfo\": {\"x-axis\":\"\",\"y-axis\": \"\"}}}.If the response is a paragaph that compares qualitative infromation of the multiple companies , use the following structure:{\"content_format\": \"Tabular\",\"content\": {\"heading\":\"heading of the summary\",\"data\": \"{\"columns\": [\"Company1\",\"Company2\"],\"results\": [{\"Point 1 about Company1\",\"Point 1 about Company2\"},{\"Point 2 about Company1\",\"Point 2 about Company2\"}]}\", \"keyHighlight\": \"Provide key takeaways in ordered list of items if it provide some additonal insights to response otherwise don't provide\"}} . If the response is in paragraph form, use the following structure:{\"content_format\": \"paragraph\",\"content\": {\"heading\":\"heading of the summary\",\"data\": \"Your response as a paragraph and highlight keywords in it.\", \"keyHighlight\": \"Provide key takeaways in ordered list of items if it provide some additonal insights to response otherwise don't provide \"}} .If the response should be presented as a bulleted list, provide it like this:{\"content_format\": \"list\", \"content\": {\"heading\":\"heading of the list\",\"intro\":\"opening statement for the response \",\"data\": \"provide ordered list of items\", \"summary\": \"provide extensive summary relevant for the response\"}}}}}"
        }],
        "temperature": 0,
        "max_tokens": 10000,
        "top_p": 0.6
    },
      // {
      //   headers: {
      //     "Access-Control-Allow-Origin": "*"
      //   },
      // }
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
