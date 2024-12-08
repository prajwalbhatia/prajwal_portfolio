import React from "react";

import Mail from "Assets/images/Mail.svg";
import Address from "Assets/images/Address.svg";

const PersonalInfo = () => {
  return (
    <div className="info d-flex">
      <div className="info-left">
        <div className="info-text">Personal Info</div>
        <div className="highlight-line"></div>
      </div>

      <div className="info-right">
        <div className="information" style={{ justifyContent: "flex-start" }}>
          <div className="d-flex m-r-1">
            <Mail />
            <span className="flex-center m-l-1">prajwal6bhatia@gmail.com</span>
          </div>

          <div className="d-flex m-r-1">
            <Address />
            <span className="flex-center m-l-1">Yamunanagar, India</span>
          </div>
        </div>
        <div className="decription">
          5+ years experienced Frontend Developer specializing in React.js,
          adept at creating seamless user experiences and delivering
          high-performing, scalable web applications. Expertise in building and
          optimizing dynamic, responsive interfaces by leveraging React
          concepts, JavaScript, and modern frontend technologies. Skilled in
          translating complex design systems and wireframes into clean,
          maintainable, and efficient code. Proficient in implementing reusable
          components, managing state with tools like Redux, and integrating
          RESTful APIs to ensure a robust user experience. Passionate about
          enhancing application performance and collaborating with
          cross-functional teams to deliver innovative, user-centric solutions.
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
