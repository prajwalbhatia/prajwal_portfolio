import React from "react";

import Date from "Assets/images/Date.svg";
import Location from "Assets/images/Location.svg";

const Achievements = () => {
  return (
    <div className="info d-flex m-t-3">
      <div className="info-left">
        <div className="info-text">Achievements</div>
        <div className="highlight-line"></div>
      </div>

      <div className="info-right">
        <div className="information">
          <div className="info-head">Smart India Hackathon Winner</div>

          <div className="flex-center info-dates">
            <div className="d-flex m-r-1">
              <Date />
              <span className="flex-center m-l-1">03/2018</span>
            </div>
            <div className="d-flex m-r-1">
              <Location />
              <span className="flex-center m-l-1">Bhuveneshwar, India</span>
            </div>
          </div>
        </div>

        <div className="decription">
          In 2018 our team FELLOWSHIP OF THE GEEK was selected for the SMART
          INDIA HACKATHON and we represented AUGMENTER(a platform that helps
          startups and accelerators to collaborate) and we won the 7th position
          and a cash prize of 50,000 rupees.
        </div>

        <div className="information m-t-2">
          <div className="info-head">HACKCBS FINALIST</div>

          <div className="flex-center info-dates">
            <div className="d-flex m-r-1">
              <Date />
              <span className="flex-center m-l-1">10/2018</span>
            </div>
            <div className="d-flex m-r-1">
              <Location />
              <span className="flex-center m-l-1">Delhi, India</span>
            </div>
          </div>
        </div>

        <div className="decription">
          In 2018 our team FELLOWSHIP OF THE GEEK was selected for the HACKCBS
          hackathon that was organized at DELHI UNIVERSITY and we represented
          ETHER DREADFUL a platform that helps the young generation learn about
          blockchain in a very interactive way.
        </div>
      </div>
    </div>
  );
};

export default Achievements;
