import React, { useState } from 'react';
import useCurrentWidth from 'Hooks/useCurrentWidth';

//CSS 
import 'Styles/main.scss';
import './heroSection.scss';

function HeroSection() {
  const [toggle, setToggle] = useState(false);

  const currentWidth = useCurrentWidth();

  return (
    <div
      id="hero-section"
      className="d-flex hero-section"
      style={{height : currentWidth / 1.9}}
    >
      <div className='heading'>Hi!<br />I am Prajwal Bhatia<br />A Front-End Developer</div>

      {/* <div className='flex-center hire-button'>
        <span className='btn-text'>Hire Me</span>
      </div> */}
    </div>
  )
}

export default HeroSection;