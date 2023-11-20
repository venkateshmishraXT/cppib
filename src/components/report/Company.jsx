import React, {useState} from "react";
import Spinner from "../loader/Spinner";
import Skeleton from "../loader/Skeleton";
import LinearChart from "../chart";
import Table from "../table";

const Company = ({ company }) => {
  console.log('inside company widget--' + company);
  return (
    <section>
        <h3>{company.company_name}</h3>
        <div className="row company-wrapper">
          <div className="column">
            <h4>Revenue</h4>
            <LinearChart chartData={company.revenue_time_series} />
          </div>
          <div className="column">
            <h4>Balance sheet</h4>
            <Table showTitle={false} columns={company.balance_sheet.data.columns} data={company.balance_sheet.data.results} />
          </div>
          <div className="column">
            <h4>Cashflow</h4>
            <Table showTitle={false} columns={company.cash_flow.data.columns} data={company.cash_flow.data.results} />
          </div>
        </div>
        <div className="accordion">
          <div className="tab company-wrapper">
            <input type="checkbox" name="accordion-1" id="cb1" />
            <label htmlFor="cb1" className="tab__label">Summary</label>
            <div className="tab__content row">
              <div className="column">
                <h4>Positive points</h4>
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
                <h4>Negative points</h4>
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
                <h4>Overall outlook</h4>
                <p>{company.summary.overall_outlook}</p>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Company;
