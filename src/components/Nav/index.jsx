import React from "react";
import "./style.css";

export const Nav = () => {
  return (
    <div className="nav">
        <div className="nav-list">
            <div className="nav-item">
                <img className="dashboard" alt="Dashboard" src="../assets/dashboard.png" />
                <div className="text-wrapper">Your dashboard</div>
            </div>
            <div className="nav-item">
                <img className="dashboard" alt="portfolio" src="/assets/folder.png" />
                <div className="text-wrapper">Your portfolio</div>
            </div>
            <div className="nav-item">
                <div className="dashboard">
                <div className="overlap-wrapper">
                    <div className="overlap-group">
                    <img className="bell" alt="alerts" src="assets/bell.png" />
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
            <div className="nav-item">
                <img className="dashboard" alt="Reports" src="public/assets/report.png" />
                <div className="text-wrapper">Reports</div>
            </div>
            <div className="nav-item">
                <img className="dashboard" alt="Experts" src="/public/assets/network.png" />
                <div className="text-wrapper">Experts network</div>
            </div>
            </div>
        </div>
  );
};

export default Nav;