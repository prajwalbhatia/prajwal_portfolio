import React from 'react';

//CSS 
import 'Styles/main.scss';
import './peopleThoughts.scss';

//COMPONENTS
import SectionHeader from 'Components/SectionsHeader/sectionsHeader.jsx';


function PeopleThoughts() {

  return (
    <div id="testimonials" className="d-flex thoughts-section">
      <SectionHeader
        resume={false}
        scrollIcon={true}
        title={{
          first: 'What',
          second: 'People think about me'
        }}
      />

      <div className='thoughts-container'>
        <div className='thought-container'>
          <div className='person-image'>

          </div>

          <div className='person-detail-container'>
            <div className='message'>
              Sed a magna semper, porta purus eu, ullamcorper ligula.
            </div>


            <div className='company-detail'>
              <div className='person-name'>Lisa Cosme</div>
              <div className='person-desigination'>Technical Officer</div>
              <div className='company-name'>ABC Company</div>
            </div>
          </div>
        </div>

        <div className='thought-container'>
          <div className='person-image'>

          </div>

          <div className='person-detail-container'>
            <div className='message'>
              Sed a magna semper, porta purus eu, ullamcorper ligula.
            </div>

            <div className='company-detail'>
              <div className='person-name'>Lisa Cosme</div>
              <div className='person-desigination'>Technical Officer</div>
              <div className='company-name'>ABC Company</div>
            </div>
          </div>
        </div>


      </div>


      <div className='thought-container-mobile'>
        <div className='person-detail-container'>
          <div className='person-image'>

          </div>

          <div className='company-detail'>
            <div className='person-name'>Lisa Cosme</div>
            <div className='person-desigination'>Technical Officer</div>
            <div className='company-name'>ABC Company</div>
          </div>
        </div>

        <div className='message'>
          Sed a magna semper, porta purus eu, ullamcorper ligula.
        </div>

      </div>
    </div>
  )
}

export default PeopleThoughts;