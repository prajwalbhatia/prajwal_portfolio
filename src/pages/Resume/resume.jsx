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
                3 years+ experienced React Developer with hands-on experience in identifying web-based user interactions along with designing and implementing highly responsive user interface components by using React Concepts. Proficient in translating design and wireframe
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
              <div className='information'>
                <div className='info-head'>
                  Software Developer
                </div>

                <div className='flex-center info-dates'>
                  <div className='d-flex m-r-1'><Date /><span className='flex-center m-l-1'>07/2021 - Present</span></div>
                  <div className='d-flex m-r-1'><Location /><span className='flex-center m-l-1'>Noida, India</span></div>
                </div>
              </div>

              <div className='decription'>
                <div className='sub-head'>Extramarks Education Pvt. Ltd.</div>
                <div className='sub-desc'>Extramarks combines the goodness of The Learning App and Live Classes to give you a seamless and wholesome learning experience.</div>

                <div className='sub-head'>Achievements/Tasks</div>
                <div className='sub-desc'>
                  <ol>
                    <li>Worked on react based application as well as react native mobile application.</li>
                    <li>Worked on some cool features like downloading of
                      videos, web and native video player, etc.</li>
                    <li>Handled the complete Player for web and native app and added some cool features like activities , milestones,
                      different content on player and many more.</li>
                    <li>Always focused on writing less, clean and reusable code.</li>
                  </ol>
                </div>

              </div>

              <div className='information m-t-2'>
                <div className='info-head'>
                  Assosiate Software Developer
                </div>

                <div className='flex-center info-dates'>
                  <div className='d-flex m-r-1'><Date /><span className='flex-center m-l-1'>08/2019 - 07/2021</span></div>
                  <div className='d-flex m-r-1'><Location /><span className='flex-center m-l-1'>Kolkata, India</span></div>
                </div>
              </div>

              <div className='decription'>
                <div className='sub-head'>Attosol Technologies</div>
                <div className='sub-desc'>It is a technology consulting and solutions development company with expertise in Identity, Security, Infrastructure, and Development.</div>

                <div className='sub-head'>Achievements/Tasks</div>
                <div className='sub-desc'>
                  <ol>
                    <li>Identified web-based user interactions and developed
                      highly responsive user interface components via React
                      Concept.</li>
                    <li>Translated design and wireframe into high quality code.<br />Developed reuseable components with proper
                      documentaton for future use.</li>
                    <li>Coordinate with the frontend team to discuss user
                      interface ideas and applications.</li>
                    <li>Minimizing the Api calls by 50% by caching things. <br />Implemented some cool configurable components.</li>
                  </ol>
                </div>
              </div>
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