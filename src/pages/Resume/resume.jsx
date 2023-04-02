import React, { lazy } from 'react';

//COMPONENTS
const Header = lazy(() => import('Components/Header/header.jsx'));
const Footer = lazy(() => import('Components/Footer/footer.jsx'));

//IMAGES
import Mail from 'Assets/images/Mail.svg';
import Mobile from 'Assets/images/Mobile.svg';
import Address from 'Assets/images/Address.svg';
import Date from 'Assets/images/Date.svg';
import Location from 'Assets/images/Location.svg';
import ReactLogo from 'Assets/images/React.svg';
import Redux from 'Assets/images/Redux.svg';
import Javascript from 'Assets/images/JavaScript.svg';
import Html from 'Assets/images/Html.svg';
import Css from 'Assets/images/Css.svg';

//CSS 
import 'Styles/main.scss';
import './style.scss';

let WORK_EXPERIENCE = [
  {
    id : 1,
    title: 'Software Develoepr Engineer - II',
    date: 'January 2021 - Present',
    location: 'Remote',
    company: 'Virtual Internship',
    companyInfo: 'Our unique end-to-end platform ensures intelligent, rapid matches between students and companies, provides access to real global internships at the world’s most exciting companies, trains students before and during the internship, and unlocks a global network of relationships.',
    acheivements: [

    ]
  },
  {
    id : 2,
    title: 'Software Developer',
    date: 'July 2021 - December 2022',
    location: 'Noida, India',
    company: 'Extramarks Education Pvt. Ltd.',
    companyInfo: 'Extramarks combines the goodness of The Learning App and Live Classes to give you a seamless and wholesome learning experience.',
    acheivements: [
      'Worked on react based application as well as react native mobile application.',
      'Worked on some cool features like downloading of videos, web and native video player, etc.',
      'Handled the complete Player for web and native app and added some cool features like activities , milestones, different content on player and many more.',
      'Always focused on writing less, clean and reusable code.'
    ]
  },
  {
    id : 3,
    title: 'Assosiate Software Developer',
    date: 'August, 2019 - July, 2021',
    location: 'Kolkata, India',
    company: 'Attosol Technologies',
    companyInfo: 'It is a technology consulting and solutions development company with expertise in Identity, Security, Infrastructure, and Development.',
    acheivements: [
      'Identified web-based user interactions and developed highly responsive user interface components via React Concept.',
      'Translated design and wireframe into high quality code.<br />Developed reuseable components with proper documentaton for future use.',
      'Coordinate with the frontend team to discuss user interface ideas and applications.',
      'Minimizing the Api calls by 50% by caching things. Implemented some cool configurable components.'
    ]
  }
]


function resume() {
  return (
    <>
      <div className='resume-page gutter'>
        <Header />
        <div className='resume'>
          {/* PERSONAL INFO */}
          <div className='info d-flex'>
            <div className='info-left'>
              <div className='info-text'>Personal Info</div>
              <div className='highlight-line'></div>
            </div>

            <div className='info-right'>
              <div
                className='information'
                style={{ justifyContent: 'flex-start' }}
              >
                <div className='d-flex m-r-1'><Mail /><span className='flex-center m-l-1'>prajwal6bhatia@gmail.com</span></div>
                <div className='d-flex m-r-1'><Mobile /><span className='flex-center m-l-1'>8708992511</span></div>
                <div className='d-flex m-r-1'><Address /><span className='flex-center m-l-1'>Yamunanagar, India</span></div>
              </div>
              <div className='decription'>
                3.5 years+ experienced React Developer with hands-on experience in identifying web-based user interactions along with designing and implementing highly responsive user interface components by using React Concepts. Proficient in translating design and wireframe
                into high-quality code, and writing application interface code via Javascript and ReactJS workflow.
              </div>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className='info d-flex m-t-3'>
            <div className='info-left'>
              <div className='info-text'>Experience</div>
              <div className='highlight-line'></div>
            </div>

            <div className='info-right'>
              {
                WORK_EXPERIENCE.map((work) => {
                  return (
                    <React.Fragment key={work.id}>
                      <div className='information'>
                        <div className='info-head'>
                          {work.title}
                        </div>

                        <div className='flex-center info-dates'>
                          <div className='d-flex m-r-1'><Date /><span className='flex-center m-l-1'>{work.date}</span></div>
                          <div className='d-flex m-r-1'><Location /><span className='flex-center m-l-1'>{work.location}</span></div>
                        </div>
                      </div>

                      <div className='decription'>
                        <div className='sub-head'>{work.company}</div>
                        <div className='sub-desc'>{work.companyInfo}</div>

                       { work.acheivements.length > 0 && <div className='sub-head'>Achievements/Tasks</div>}
                        <div className='sub-desc'>
                          <ol>
                            {
                              work.acheivements.map((achi , index) => {
                                return (
                                  <li key={index}>{achi}</li>
                                )
                              })
                            }
                          </ol>
                        </div>
                      </div>
                    </React.Fragment>
                  )
                })
              }
            </div>
          </div>


          {/* EDUCATION */}
          <div className='info d-flex m-t-3'>
            <div className='info-left'>
              <div className='info-text'>Education</div>
              <div className='highlight-line'></div>
            </div>

            <div className='info-right'>
              <div className='information'>
                <div className='info-head'>
                  Btech in Computer Science
                </div>

                <div className='flex-center info-dates'>
                  <div className='d-flex m-r-1'><Date /><span className='flex-center m-l-1'>08/2016 - 05/2020,</span></div>
                  <div className='d-flex m-r-1'><Location /><span className='flex-center m-l-1'>Radaur, India</span></div>
                </div>
              </div>

              <div className='decription'>
                Seth Jai Prakash Mukand Lal Institute of
                Engineering and Technology
              </div>

            </div>
          </div>

          {/* TECHNICAL SKILLS */}
          <div className='info d-flex m-t-3'>
            <div className='info-left'>
              <div className='info-text'>TECHNICAL SKILLS</div>
              <div className='highlight-line'></div>
            </div>

            <div className='info-right'>
              <div className='d-flex logo-lane'>
                <div className='logo-div '>
                  <ReactLogo />
                  <div>React</div>
                </div>

                <div className='logo-div'>
                  <Javascript />
                  <div>Javascript</div>
                </div>

                <div className='logo-div'>
                  <Html />
                  <div>HTML</div>
                </div>

                <div className='logo-div'>
                  <Css />
                  <div>CSS</div>
                </div>

                <div className='logo-div'>
                  <Redux />
                  <div>Redux</div>
                </div>
              </div>
            </div>
          </div>

          {/* PERSONAL PROJECTS */}
          <div className='info d-flex m-t-3'>
            <div className='info-left'>
              <div className='info-text'>Personal Projects</div>
              <div className='highlight-line'></div>
            </div>

            <div className='info-right'>
              <div className='information'>
                <div className='info-head'>
                  Habstreak
                </div>

                <div className='flex-center info-dates'>
                  <div className='d-flex m-r-1'><Date /><span className='flex-center m-l-1'>12/2021 - Present</span></div>
                </div>
              </div>

              <div className='decription'>
                <ol>
                  <li>It is a react application that helps to keep going with your daily
                    tasks. It has a concept of streak and reward, a streak that helps
                    you do your task daily, and rewards that help you complete the
                    task as early as possible.</li>
                  <li>URL - <a target={'_blank'} href="https://habstreak.com">HABSTREAK</a></li>
                </ol>
              </div>


              <div className='information m-t-2'>
                <div className='info-head'>
                  Habstreak App
                </div>

                <div className='flex-center info-dates'>
                  <div className='d-flex m-r-1'><Date /><span className='flex-center m-l-1'>07/2022 - Present</span></div>
                </div>
              </div>

              <div className='decription'>
                <ol>
                  <li>It is a React Native Mobile App of Habstreak.</li>
                  <li>URL - <a target={'_blank'} href="https://play.google.com/store/apps/details?id=com.Habstreak">HABSTREAK APP</a></li>
                </ol>
              </div>
            </div>
          </div>



          {/* ACHIEVEMENTS */}
          <div className='info d-flex m-t-3'>
            <div className='info-left'>
              <div className='info-text'>Achievements</div>
              <div className='highlight-line'></div>
            </div>

            <div className='info-right'>
              <div className='information'>
                <div className='info-head'>
                  Smart India Hackathon Winner
                </div>

                <div className='flex-center info-dates'>
                  <div className='d-flex m-r-1'><Date /><span className='flex-center m-l-1'>03/2018</span></div>
                  <div className='d-flex m-r-1'><Location /><span className='flex-center m-l-1'>Bhuveneshwar, India</span></div>
                </div>
              </div>

              <div className='decription'>
                In 2018 our team FELLOWSHIP OF THE GEEK was selected for the
                SMART INDIA HACKATHON and we represented AUGMENTER(a
                platform that helps startups and accelerators to collaborate) and we
                won the 7th position and a cash prize of 50,000 rupees.
              </div>


              <div className='information m-t-2'>
                <div className='info-head'>
                  HACKCBS FINALIST
                </div>

                <div className='flex-center info-dates'>
                  <div className='d-flex m-r-1'><Date /><span className='flex-center m-l-1'>10/2018</span></div>
                  <div className='d-flex m-r-1'><Location /><span className='flex-center m-l-1'>Delhi, India</span></div>
                </div>
              </div>

              <div className='decription'>
                In 2018 our team FELLOWSHIP OF THE GEEK was selected for the
                HACKCBS hackathon that was organized at DELHI UNIVERSITY and
                we represented ETHER DREADFUL a platform that helps the young
                generation learn about blockchain in a very interactive way.
              </div>

            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default resume