import React from "react";
import Skeleton from "../loader/Skeleton";

const Summary = ({ content, reversedSummaryHistory }) => {
  return (
    <section>
      {content ?
        <div className="row">
          <div className="column">
            <h3>{content.heading}</h3>
            <p className="content">{content.data}</p>
          </div>
          <div className="column">
            <h3>Key highlights</h3>
            <ul>
              {content.keyHighlight.map((keyItem, index) => (
                <li key={index}>
                  {keyItem}
                </li>
              ))}
            </ul>
          </div>
        </div>
        : <Skeleton />
      }
      {/* {reversedSummaryHistory.length > 0 && (
        <div className="summary-history-wrapper">
          <div className="summary-history">
            <ul>
              {reversedSummaryHistory.map((summary, index) => (
                <li key={index}>{summary}</li>
              ))}
            </ul>
          </div>
        </div>
      )} */}
    </section>
  );
};

export default Summary;
