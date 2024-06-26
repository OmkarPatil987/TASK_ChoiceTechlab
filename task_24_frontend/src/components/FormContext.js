
import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    personalInfo: {},
    profileInfo: {
      skills: {
        mysql: false,
        java: false,
        javascript: false,
        react: false,
        springboot: false,
        aws: false
      }
    },
    academicInfo: {
      SSC: { schoolName: '', percentage: '' },
      HSC: { schoolName: '', percentage: '' },
      Graduation: { schoolName: '', percentage: '' },
      PostGraduation: { schoolName: '', percentage: '' }
    },
    workExperience: [],
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
