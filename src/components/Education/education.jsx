import React from "react";

import Date from "Assets/images/Date.svg";
import Location from "Assets/images/Location.svg";

function Education() {
  return (
    <div className="info d-flex m-t-3">
      <div className="info-left">
        <div className="info-text">Education</div>
        <div className="highlight-line"></div>
      </div>

      <div className="info-right">
        <div className="information">
          <div className="info-head">Btech in Computer Science</div>

          <div className="flex-center info-dates">
            <div className="d-flex m-r-1">
              <Date />
              <span className="flex-center m-l-1">08/2016 - 05/2020,</span>
            </div>
            <div className="d-flex m-r-1">
              <Location />
              <span className="flex-center m-l-1">Radaur, India</span>
            </div>
          </div>
        </div>

        <div className="decription">
          Seth Jai Prakash Mukand Lal Institute of Engineering and Technology
        </div>
      </div>
    </div>
  );
}

export default Education;
