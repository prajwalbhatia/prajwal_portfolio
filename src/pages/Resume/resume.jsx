import React, { lazy } from "react";

const Header = lazy(() => import("Components/Header/header.jsx"));
const Footer = lazy(() => import("Components/Footer/footer.jsx"));
const PersonalInfo = lazy(() =>
  import("Components/PersonalInfo/personalInfo.jsx")
);
const Experience = lazy(() => import("Components/Experience/experience.jsx"));
const Education = lazy(() => import("Components/Education/education.jsx"));
const TechnicalSkills = lazy(() =>
  import("Components/TechnicalSkills/technicalSkills.jsx")
);
const PersonalProjects = lazy(() =>
  import("Components/PersonalProjects/personalProjects.jsx")
);
const Achievements = lazy(() =>
  import("Components/Achievements/achievements.jsx")
);

import "Styles/main.scss";
import "./style.scss";

function resume() {
  return (
    <>
      <div className="resume-page gutter">
        <Header />
        <div className="resume">
          <PersonalInfo />
          <Experience />
          <Education />
          <TechnicalSkills />
          <PersonalProjects />
          <Achievements />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default resume;
