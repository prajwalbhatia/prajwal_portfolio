import React, { lazy, Suspense } from 'react';

//Third party libraries
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

//PAGES
const HomePage = lazy(() => import('./pages/HomePage/homePage.jsx'));
const ResumePage = lazy(() => import('./pages/Resume/resume.jsx'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Switch>
          {/* <Route path="/home" component={HomePage} /> */}
          <Route exact path="/" component={HomePage} />
          <Route path="/resume" component={ResumePage} />

        </Switch>
      </Router>
    </Suspense>
  )
}

export default App