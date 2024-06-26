// import React from 'react';
// import { BrowserRouter,Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import PersonalInfo from './components/PersonalInfo';
// import ProfileInfo from './components/ProfileInfo';
// import AcademicInfo from './components/AcademicInfo';
// import WorkExperience from './components/WorkExperience';
// import Home from './components/home';


// const App = () => {
//   return (
//     <div  className="container mt-3">
//     <BrowserRouter>
//       <Navbar />
//       <div className="container mt-3">
//         <Routes>
//         <Route path="/" element={<Home/>} />

//           <Route path="/personal-info" element={<PersonalInfo />} />
//           <Route path="/profile-info" element={<ProfileInfo />} />
//           <Route path="/academic-info" element={<AcademicInfo />} />
//           <Route path="/work-experience" element={<WorkExperience />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//     </div>
//   );
// };

// export default App;


// src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PersonalInfo from './components/PersonalInfo';
import ProfileInfo from './components/ProfileInfo';
import AcademicInfo from './components/AcademicInfo';
import WorkExperience from './components/WorkExperience';
import Home from './components/home';
import { FormProvider } from './components/FormContext';

const App = () => {
  return (
    <div className="container mt-3">
      <BrowserRouter>
        <FormProvider>
          <Navbar />
          <div className="container mt-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/personal-info" element={<PersonalInfo />} />
              <Route path="/profile-info" element={<ProfileInfo />} />
              <Route path="/academic-info" element={<AcademicInfo />} />
              <Route path="/work-experience" element={<WorkExperience />} />
            </Routes>
          </div>
        </FormProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;






