import React from "react";

import { renderProjectInfo } from "Helpers/renderer.jsx";
import { PROJECTS } from "Helpers/constants.jsx";

const PersonalProjects = () => {
  return (
    <div className="info d-flex m-t-3">
      <div className="info-left">
        <div className="info-text">Personal Projects</div>
        <div className="highlight-line"></div>
      </div>
      <div className="info-right">
        {PROJECTS.map((project) => renderProjectInfo({ ...project }))}
      </div>
    </div>
  );
};

export default PersonalProjects;
