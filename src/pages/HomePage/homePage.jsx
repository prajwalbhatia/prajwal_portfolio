import React, { lazy } from 'react';

//COMPONENTS
const Header = lazy(() => import('Components/Header/header.jsx'));
const Footer = lazy(() => import('Components/Footer/footer.jsx'));
const HeroSection = lazy(() => import('Components/HeroSection/heroSection.jsx'));
const SkillSection = lazy(() => import('Components/SkillsSection/skillSection.jsx'));
const ProjectSection = lazy(() => import('Components/ProjectsSection/projectsSection.jsx'));
const PeopleThoughts = lazy(() => import('Components/PeopleThoughts/peopleThoughts.jsx'));

function homePage() {
  return (
    <>
      <div className='home-page gutter'>
        <Header />
        <HeroSection />
        <SkillSection />
        <ProjectSection />
        {/* <PeopleThoughts /> */}
        <Footer />
      </div>

    </>
  )
}

export default homePage