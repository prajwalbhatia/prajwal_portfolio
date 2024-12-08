import React from "react";

import { WORK_EXPERIENCE } from "Helpers/constants.jsx";

import Date from "Assets/images/Date.svg";
import Location from "Assets/images/Location.svg";

const Experience = () => {
  return (
    <div className="info d-flex m-t-3">
      <div className="info-left">
        <div className="info-text">Experience</div>
        <div className="highlight-line"></div>
      </div>

      <div className="info-right">
        {WORK_EXPERIENCE.map((work) => {
          return (
            <React.Fragment key={work.id}>
              <div className="information">
                <div className="info-head">{work.title}</div>

                <div className="flex-center info-dates">
                  <div className="d-flex m-r-1">
                    <Date />
                    <span className="flex-center m-l-1">{work.date}</span>
                  </div>
                  <div className="d-flex m-r-1">
                    <Location />
                    <span className="flex-center m-l-1">{work.location}</span>
                  </div>
                </div>
              </div>

              <div className="decription">
                <div className="sub-head">{work.company}</div>
                <div className="sub-desc">{work.companyInfo}</div>

                {work.acheivements.length > 0 && (
                  <div className="sub-head">Achievements/Tasks</div>
                )}
                <div className="sub-desc">
                  <ol>
                    {work.acheivements.map((achi, index) => {
                      return <li key={index}>{achi}</li>;
                    })}
                  </ol>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
