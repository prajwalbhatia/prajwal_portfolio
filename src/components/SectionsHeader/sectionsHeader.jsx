import React from 'react';
import { useHistory } from "react-router-dom";

//CSS 
import 'Styles/main.scss';
import './sectionsHeader.scss';

//IMAGES
import LeftArrow from 'Assets/images/Left-Arrow.svg';
import RightArrow from 'Assets/images/Right-Arrow.svg';


function SectionHeader({ title, resume, scrollIcon }) {
  const history = useHistory();
  
  return (
    <div className='section-header'>
      <div className='title-lane'>
        <div className='left-part'>
          <div className='title'>{title.first}</div>
          <div className='title'>{title.second}</div>
          <div className='highlight-line'></div>
        </div>

        {
          resume && <div onClick={() => history.push('/resume')} className='right-part'>
            <div>VIEW FULL RESUME</div>
          </div>
        }

        {
          scrollIcon && <div className='right-part'>
            <div className='left-arrow-container'>
              <LeftArrow />
            </div>
            <div className='right-arrow-container'>
              <RightArrow />
            </div>
          </div>
        }
      </div>
    </div >
  )
}

SectionHeader.defaultProps = {
  resume: false,
  title: {
    first: '',
    second: ''
  }
}

export default SectionHeader;