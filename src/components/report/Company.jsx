import React, {useState} from "react";
import Spinner from "../loader/Spinner";
import Skeleton from "../loader/Skeleton";
import LinearChart from "../chart";

const Company = ({ company }) => {
  console.log('inside company widget--' + company);
  return (
    <section>
        <div className="row company-wrapper">
          <div className="column">
            <h3>{company.company_name}</h3>
            <LinearChart chartData={company.revenue_time_series} />
          </div>
          <div className="column">
            <h3>Positive points</h3>
            <ul className="actions-list">
              {company.summary &&
                company.summary.positive_points.map((positiveItem, index) => (
                  <li key={index}>
                    {positiveItem}
                  </li>
                ))}
            </ul>
          </div>
          <div className="column">
            <h3>Negative points</h3>
            <ul className="actions-list">
              {company.summary &&
                company.summary.negative_points.map((negativeItem, index) => (
                  <li key={index}>
                    {negativeItem}
                  </li>
                ))}
            </ul>
          </div>
          <div className="column">
            <h3>Overall outlook</h3>
            <p>{company.summary.overall_outlook}</p>
          </div>
        </div>
    </section>
  );
};

export default Company;
