import React from "react";

import ReactLogo from "Assets/images/React.svg";
import Redux from "Assets/images/Redux.svg";
import Javascript from "Assets/images/JavaScript.svg";
import Html from "Assets/images/Html.svg";
import Css from "Assets/images/Css.svg";

const TechnicalSkills = () => {
  return (
    <div className="info d-flex m-t-3">
      <div className="info-left">
        <div className="info-text">TECHNICAL SKILLS</div>
        <div className="highlight-line"></div>
      </div>

      <div className="info-right">
        <div className="d-flex logo-lane">
          <div className="logo-div ">
            <ReactLogo />
            <div>React</div>
          </div>

          <div className="logo-div">
            <Javascript />
            <div>Javascript</div>
          </div>

          <div className="logo-div">
            <Html />
            <div>HTML</div>
          </div>

          <div className="logo-div">
            <Css />
            <div>CSS</div>
          </div>

          <div className="logo-div">
            <Redux />
            <div>Redux</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSkills;
