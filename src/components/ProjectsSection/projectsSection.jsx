import React from "react";

import "Styles/main.scss";
import "./projectsSection.scss";

import SectionHeader from "Components/SectionsHeader/sectionsHeader.jsx";

import { socialMediaClick } from "Utilities";

import HabstreakImage from "Assets/images/habstreak_front.png";

function ProjectSection() {
  return (
    <div id="projects" className="d-flex projects-section">
      <SectionHeader
        resume={false}
        scrollIcon={true}
        title={{
          first: "Check",
          second: "out my projects",
        }}
      />

      <div className="projects-container">
        <div className="project-container">
          <div
            style={{ backgroundImage: `url(${HabstreakImage})` }}
            className="project-image"
          ></div>

          <div className="project-detail-container">
            <div className="title">Habstreak</div>
            <div className="description">
              It is a react application that helps to keep going with your daily
              tasks. It has a concept of streak and reward, a streak that helps
              you to do your task daily, and rewards that help you complete the
              task as early as possible.
            </div>
            <div
              onClick={() => socialMediaClick("habstreak")}
              className="view-more"
            >
              VIEW MORE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectSection;
