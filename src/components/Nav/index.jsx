import React from "react";
import "./style.css";

export const Box = () => {
  return (
    <div className="box">
      <div className="group">
        <div className="overlap">
          <div className="frame">
            <div className="div">
              <img className="dashboard" alt="Dashboard" src="dashboard.svg" />
              <div className="text-wrapper">Your dashboard</div>
            </div>
            <div className="div">
              <img className="dashboard" alt="Dashboard" src="image.svg" />
              <div className="text-wrapper">Your portfolio</div>
            </div>
            <div className="div">
              <div className="dashboard">
                <div className="overlap-wrapper">
                  <div className="overlap-group">
                    <img className="bell" alt="Bell" src="bell.svg" />
                    <div className="overlap-group-wrapper">
                      <div className="overlap-group-2">
                        <div className="rectangle" />
                        <div className="text-wrapper-2">8</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-wrapper">Your alerts</div>
            </div>
            <div className="div">
              <img className="dashboard" alt="Dashboard" src="dashboard-2.svg" />
              <div className="text-wrapper">Reports</div>
            </div>
            <div className="div">
              <img className="dashboard" alt="Dashboard" src="dashboard-3.svg" />
              <div className="text-wrapper">Experts network</div>
            </div>
          </div>
          <img className="vector" alt="Vector" src="vector-11.svg" />
        </div>
      </div>
    </div>
  );
};
