

import React, { useRef, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormContext } from './FormContext';

const PersonalInfo = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { setFormData } = useContext(FormContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!formRef.current) {
      console.error('Form reference is not valid.');
      return;
    }

    const formData = new FormData(formRef.current);

    const name = formData.get('name').trim();
    const dob = formData.get('dob').trim();
    const address = formData.get('address').trim();
    const mobile = formData.get('mobile').trim();
    const email = formData.get('email').trim();
    const resume = formData.get('resume');

    if (!name) {
      validationErrors.name = 'Name is required.';
    }

    if (!dob) {
      validationErrors.dob = 'DOB is required.';
    } else {
      const birthDate = new Date(dob);
      let age = new Date().getFullYear() - birthDate.getFullYear();
     
      if (age < 18) {
        validationErrors.dob = 'You must be at least 18 years old.';
      }
    }

    if (!address) {
      validationErrors.address = 'Address is required.';
    }

    if (!mobile) {
      validationErrors.mobile = 'Mobile is required.';
    } else if (!/^\d{10}$/.test(mobile)) {
      validationErrors.mobile = 'Mobile number must be 10 digits.';
    }

   if (!email) {
  validationErrors.email = 'Email is required.';
} else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
  validationErrors.email = 'Invalid email format.';
}


    if (!resume) {
      validationErrors.resume = 'Resume is required.';
    }

    if (Object.keys(validationErrors).length > 0) {
      displayErrors(validationErrors);
      return;
    }

    try {
      // Save form data to context
      setFormData(prevFormData => ({
        ...prevFormData,
        personalInfo: {
          name,
          dob,
          address,
          mobile,
          email,
          resume
        }
      }));

      await axios.post('http://localhost:5000/personal-info', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      navigate('/profile-info');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const displayErrors = (errors) => {
    Object.keys(errors).forEach(field => {
      const errorElement = document.getElementById(`${field}-error`);
      if (errorElement) {
        errorElement.innerText = errors[field];
      }
    });
  };

  return (
    <div>
      <h2>Personal Info</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name:</label>
          <input type="text" className="form-control" name="name" />
          <div id="name-error" className="text-danger"></div>
        </div>
        <div className="mb-3">
          <label>DOB:</label>
          <input type="date" className="form-control" name="dob" />
          <div id="dob-error" className="text-danger"></div>
        </div>
        <div className="mb-3">
          <label>Address:</label>
          <textarea className="form-control" name="address"></textarea>
          <div id="address-error" className="text-danger"></div>
        </div>
        <div className="mb-3">
          <label>Mobile:</label>
          <input type="tel" className="form-control" name="mobile" />
          <div id="mobile-error" className="text-danger"></div>
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control" name="email" />
          <div id="email-error" className="text-danger"></div>
        </div>
        <div className="mb-3">
          <label>Resume (PDF):</label>
          <input type="file" className="form-control" name="resume" />
          <div id="resume-error" className="text-danger"></div>
        </div>
        <button type="submit" className="btn btn-primary me-2">Submit</button>
      </form>

      <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/')}>Cancel</button>
    </div>
  );
};

export default PersonalInfo;
