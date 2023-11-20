import React from "react";
import Spinner from "../loader/Spinner";
import Summary from "./Summary";
import Actions from "./Actions";
import Sources from "./Sources";
import Company from "./Company";
import LinearChart from "../chart";
import CompareChart from "../compareChart";
import Table from "../table";
import "./style.css";

const AnalysisReport = ({
  analysisResponse,
  actionsResponse,
  isMessageLoading,
  isActionsLoading,
  summaryHistory,
  sentimentHistory,
  setSelectedAction
}) => {
  const { summary, sentiment } = analysisResponse?.data || {};
  const reversedSummaryHistory = [...summaryHistory].reverse().slice(1);
  // const { actions, sources, trends, content, data } = actionsResponse?.data || {};
  const apiResponse = actionsResponse?.data.choices[0].message.content;
  const { actions, references, content, data, content_format } = apiResponse || {};

  // Remove escape characters \" and \n
  const unescapedApiResponse = apiResponse?.replace(/\\"/g, '"').replace(/\\n/g, '\n');
  let apiResponseObj = "";
  if (unescapedApiResponse) {
    apiResponseObj = JSON.parse(unescapedApiResponse);
  }

  const containerClass = `analyse-container ${
    isMessageLoading ? "loading" : ""
  } ${isActionsLoading ? "actions-loading" : ""}`;

  const pageHeadClass = `page-heading ${
    isActionsLoading ? "loading" : ""
  }`;

  // const getComponent = ()  => {
  //   let component;
  //   switch (actionsResponse) {
  //       case actionsResponse?.data.actions :
  //           console.log('inside actions');
  //           component = <Actions actions={actions} isActionsLoading={isActionsLoading} setSelectedAction={setSelectedAction}  />;
  //           break;
  //       case actionsResponse?.data.trends :
  //           console.log('inside trends');
  //           component = <Sentiment sentiment={sentiment} sentimentHistory={sentimentHistory} />;
  //           break;
  //   }
  //   console.log('outside switch');
  //   return component;
  // }
  return (
    <div className={containerClass}>
      <h2 className={pageHeadClass}>
        {'Your personal AI investment analyst...'}
        <Spinner />
      </h2>

      <div className="row">
        {/* <div className="column">
          <Sentiment
            sentiment={sentiment}
            sentimentHistory={sentimentHistory}
          />
          <Summary
            summary={summary}
            reversedSummaryHistory={reversedSummaryHistory}
          />
        </div> */}
          { apiResponseObj.content_format == 'paragraph' ? (
            <div className="column">
              <Summary content={apiResponseObj.content}  />
            </div>
          ) : ''}
          
          { apiResponseObj.content_format == 'list' ? (
          <div className="column">
            <Actions actions={apiResponseObj.content} isActionsLoading={isActionsLoading} setSelectedAction={setSelectedAction}  />
            {/* <Summary content={apiResponseObj.content}  /> */}
          </div>
          ) : ''}
          { apiResponseObj.content_format == 'timeseries' ? (
            <div className="row">

              <div className="column">
                <h3>{apiResponseObj.content.Heading}</h3>
                {/* <LineChart lineChartData={apiResponseObj.content} /> */}
                <LinearChart chartData={apiResponseObj.content} />
              </div>
              <div className="column">
                <h3>Insights</h3>
                <p>{apiResponseObj.content.Summary}</p>
              </div>
            </div>
          ) : ''}

          { apiResponseObj.content_format == 'timeseries-multi' ? (
            <div className="row">
              <div className="column">
                <h3>{apiResponseObj.content.Heading}</h3>
                {/* <LineChart lineChartData={apiResponseObj.content} /> */}
                <CompareChart chartData={apiResponseObj.content} />
              </div>
              <div className="column">
                <h3>Insights</h3>
                <p>{apiResponseObj.content.Summary}</p>
              </div>
            </div>
          ) : ''}

          { apiResponseObj.content_format == 'Tabular' ? (
            <div className="row">
              <div className="column">
                <h3>{apiResponseObj.content.heading}</h3>
                {/* <LineChart lineChartData={apiResponseObj.content} /> */}
                <Table showTitle={true} columns={apiResponseObj.content.data.columns} data={apiResponseObj.content.data.results} />
              </div>
              {apiResponseObj.content?.keyHighlight.length ? (<div className="column keyhighlight-box">
                <h3>Key highlights</h3>
                <p>{apiResponseObj.content?.keyHighlight}</p>
              </div>): ''}
            </div>
          ) : ''}

          { apiResponseObj.content_format == 'company' ? (
            <Company company={apiResponseObj} />
          ) : ''}

          { references ? (
            <Sources sources={references} isActionsLoading={isActionsLoading} />
          ) : ''}


      </div>
    </div>
  );
};

export default AnalysisReport;
