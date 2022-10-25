import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

//IMAGES
import Logo from 'Assets/images/Logo.svg';

//CSS 
import 'Styles/main.scss';
import './footer.scss';

//UTILITIES
import { socialMediaClick } from 'Utilities';


function Footer() {
  const [toggle, setToggle] = useState(false);
  const [selectedNav, setSelectedNav] = useState('home');

  const history = useHistory();

  const toggleMenu = () => {
    setToggle(!toggle);
  }

  const handleLinkClick = (e) => {
    e.stopPropagation();

    const navValue = e.target.dataset?.value;

    if (navValue && navValue === 'resume') {
      history.push('/resume');
    }
    else {
      document.getElementById(e.target.getAttribute('data-value')).scrollIntoView({ behavior: 'smooth' });
      setSelectedNav(e.target.getAttribute('data-value'));
    }
    console.log('E', e.target)
  }

  const socialMediaFunc = (e) => {
    const val = e.target.dataset?.key;

    if(val)
    {
      socialMediaClick(val);
    }
  }

  return (
    <div className="d-flex footer">
      <div className='d-flex navigation'>
        <nav className='nav'>
          <ol
            className='d-flex'
            onClick={handleLinkClick}
          >
            <li data-value='services'>Services</li>
            <li data-value='projects'>Projects</li>
            {/* <li data-value='testimonials'>Testimonials</li> */}
            <li data-value='blogs'>Blogs</li>
            {/* <li data-value='contacts'>Contacts</li> */}
            <li data-value='resume'>Resume</li>
          </ol>
        </nav>
      </div >

      <div className='d-flex social-media'>
        <nav className='nav'>
          <ol
            className='d-flex'
            onClick={socialMediaFunc}
          >
            <li data-key="instagram">INSTAGRAM</li>
            <li data-key="twitter">TWITTER</li>
          </ol>
        </nav>
      </div>


      <div className='d-flex copyright-container'>
        <span className='copyright-text'>Copyright © by</span>
        <span className='logo-container'><Logo /></span>

      </div>
    </div>
  )
}

export default Footer;