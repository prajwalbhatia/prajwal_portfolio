import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

//IMAGES
import Logo from 'Assets/images/Logo.svg';
import Linkedin from 'Assets/images/Linkedin.svg';
import Github from 'Assets/images/Github.svg';
import Menu from 'Assets/images/Menu.svg';
import Close from 'Assets/images/Close.svg';

//CSS 
import 'Styles/main.scss';
import './header.scss';

//UTILITIES
import { socialMediaClick } from 'Utilities';

function Header() {
  const [toggle, setToggle] = useState(false);
  const [selectedNav, setSelectedNav] = useState('home');

  const history = useHistory();

  const toggleMenu = () => {
    setToggle(!toggle);
  }

  const handleLinkClick = (e) => {
    e.stopPropagation();
    const navValue = e.target.dataset?.value;
    const path = history.location.pathname;
    if (navValue && navValue === 'resume') {
      history.push('/resume');
    }
    else if(navValue && navValue === 'blogs')
    {
      socialMediaClick('blogs')
    }
    else if(navValue && navValue === 'youtube')
    {
      socialMediaClick('youtube')
    }
    else if(path === '/resume')
    {
      history.push('/')
    }
    else {
      document.getElementById(e.target.getAttribute('data-value')).scrollIntoView({ behavior: 'smooth' });
    }
    setSelectedNav(navValue);
  }

  const backToHome = () => {
    history.push('/')
  }

  return (
    <header className="d-flex header">
      <div
        onClick={backToHome}
        className="brand-name-container">
        <Logo />
      </div>

      <div className='d-flex navigation'>
        <nav className='nav'>
          <ol
            className='d-flex'
            onClick={handleLinkClick}
          >
            <li data-value='services'>Services</li>
            <li data-value='projects'>Projects</li>
            <li data-value='blogs'>Blogs</li>
            <li data-value='resume'>Resume</li>
            <li data-value='youtube'>Youtube</li>
          </ol>
        </nav>
      </div >

      <div className='d-flex social-media'>
        <div onClick={() => socialMediaClick('linkedin')} className='m-r-1'>
          <Linkedin />
        </div>

        <div onClick={() => socialMediaClick('github')}>
          <Github />
        </div>
      </div>

      <div className='d-flex mobile-menu'>
        <div className='pos-rel c-pointer' onClick={toggleMenu}>
          {!toggle ? <Menu /> : <Close />}
          {toggle && <div className='menu-item-container'>
            <ol
              className=''
              onClick={(e) => handleLinkClick(e)}
            >
              <li data-value='services'>Services</li>
              <li data-value='projects'>Projects</li>
              <li data-value='testimonials'>Testimonials</li>
              {/* <li data-value='contacts'>Contacts</li> */}
              <li data-value='blogs'>Blogs</li>
              <li data-value='resume'>Resume</li>
            </ol>
          </div>
          }
        </div>


      </div>
    </header>
  )
}

export default Header;