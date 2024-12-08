import React from "react";

import Date from "Assets/images/Date.svg";

export const renderProjectInfo = ({
  title,
  dates,
  description,
  url,
  urlText,
  projectId,
}) => (
  <React.Fragment key={projectId}>
    <div className="information">
      <div className="info-head">{title}</div>
      <div className="flex-center info-dates">
        <div className="d-flex m-r-1">
          <Date />
          <span className="flex-center m-l-1">{dates}</span>
        </div>
      </div>
    </div>

    <div className="decription">
      <ol>
        {description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
        {url && (
          <li>
            URL -{" "}
            <a target="_blank" rel="noopener noreferrer" href={url}>
              {urlText}
            </a>
          </li>
        )}
      </ol>
    </div>
  </React.Fragment>
);
