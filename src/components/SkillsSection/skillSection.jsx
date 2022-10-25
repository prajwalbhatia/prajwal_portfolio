import React from 'react';

//CSS 
import 'Styles/main.scss';
import './skillSection.scss';

//IMAGES
import Backend from 'Assets/images/backend.svg';
import Frontend from 'Assets/images/frontend.svg';
import Native from 'Assets/images/native.svg';

//COMPONENTS
import SectionHeader from 'Components/SectionsHeader/sectionsHeader.jsx';


function SkillSection() {

  return (
    <div id="services" className="d-flex skill-section">
      <SectionHeader
        resume={true}
        title={{
          first : 'What',
          second : 'I Can Do'
        }}
      />

      <div className='skills-container'>
        <div className='skill-container'>
          <div className='img-container'>
            <Frontend />
          </div>
          <div className='title'>Frontend <br />Apps</div>
          <div className='description'>Build client-side applications with modern features like SPA and maintain semantic coding style among other best practices for SEO optimisation. Use modern tech such as React, Redux and may more.</div>
        </div>

        <div className='skill-container'>
          <div className='img-container'>
            <Native />
          </div>
          <div className='title'>Native <br />Apps</div>
          <div className='description'>Use React native for building simple native mobile applications. React native is modern, fast, cross-platform, and popular.</div>
        </div>

        <div className='skill-container'>
          <div className='img-container'>
            <Backend />
          </div>
          <div className='title'>Backend <br />Apps</div>
          <div className='description'>Build scalable and maintainable server applications using modern technology stacks such as Node.js, Express, and MongoDB.</div>
        </div>
      </div>

    </div>
  )
}

export default SkillSection;