import React from "react";
import Skeleton from "../loader/Skeleton";
import SentimentChart from "../chart";

const sentimentLabels = [
  "Extremely Negative",
  "Very Negative",
  "Negative",
  "Slightly Negative",
  "Neutral",
  "Neutral",
  "Slightly Positive",
  "Positive",
  "Very Positive",
  "Extremely Positive",
];

const sentimentIcons = {
  "Extremely Negative": "😢😡",
  "Very Negative": "😞😠",
  Negative: "🙁",
  "Slightly Negative": "😐",
  Neutral: "😐",
  "Slightly Positive": "🙂",
  Positive: "😀",
  "Very Positive": "😄😃",
  "Extremely Positive": "😍🤗",
};

const Sentiment = ({ sentiment, sentimentHistory }) => {
  const sentimentScore = sentiment ? Math.round(parseInt(sentiment, 10)) : "";
  const sentimentLabel = sentiment ? sentimentLabels[sentimentScore] : ""; 
  const sentimentIconsForLabel = sentimentIcons[sentimentLabel] || "";
  const grayscaleValue = (9 - sentimentScore) * 10;
  const emojiStyle = {
    filter: `grayscale(${grayscaleValue}%)`,
  };

  return (
    <section>
      <h3>Sentiment</h3>
      {sentiment ? (
        <>
          <span className="sentiment-icon" style={emojiStyle}>
            {sentimentIconsForLabel}
          </span>
          <span className="sentiment-text">{sentimentLabel}</span>
        </>
      ) : (
        <Skeleton />
      )}
      {sentimentHistory && sentimentHistory.length > 0 && (
        <SentimentChart sentimentHistory={sentimentHistory} />
      )}
    </section>
  );
};

export default Sentiment;
