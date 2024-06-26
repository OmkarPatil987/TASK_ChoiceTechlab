
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormContext } from './FormContext';

const AcademicInfo = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(FormContext);

  const initialAcademicData = formData.academicInfo;

  const [academicData, setAcademicData] = useState(initialAcademicData);
  const [errors, setErrors] = useState({
    global: '', 
    SSC: { schoolName: '', percentage: '' },
    HSC: { schoolName: '', percentage: '' },
    Graduation: { schoolName: '', percentage: '' },
    PostGraduation: { schoolName: '', percentage: '' }
  });

  useEffect(() => {
    setAcademicData(formData.academicInfo);
  }, [formData.academicInfo]);

  //update formdata whenever data chnages
  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      academicInfo: academicData
    }));
  }, [academicData, setFormData]);

  const handleInputChange = (e, level) => {
    const { name, value } = e.target;
    setAcademicData(prevData => ({
      ...prevData,
      [level]: {
        ...prevData[level],
        [name]: value
      }
    }));
  };

  const prevStep = () => {
    navigate('/profile-info');
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      global: '', 
      SSC: { schoolName: '', percentage: '' },
      HSC: { schoolName: '', percentage: '' },
      Graduation: { schoolName: '', percentage: '' },
      PostGraduation: { schoolName: '', percentage: '' }
    };

    Object.keys(academicData).forEach(level => {
      if (academicData[level].schoolName.trim() === '') {
        newErrors[level].schoolName = 'School Name is required.';
        valid = false;
      }
      if (academicData[level].percentage.trim() === '') {
        newErrors[level].percentage = 'Percentage/CGPA is required.';
        valid = false;
      } else if (parseInt(academicData[level].percentage) >= 100) {
        newErrors[level].percentage = 'Percentage/CGPA must be less than 100.';
        valid = false;
      }
    });

    if (!valid) {
      newErrors.global = 'Please fix errors before submitting.';
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const dataToSend = {
      academicData: [
        { education: 'SSC', school_name: academicData.SSC.schoolName, percentage: academicData.SSC.percentage },
        { education: 'HSC', school_name: academicData.HSC.schoolName, percentage: academicData.HSC.percentage },
        { education: 'Graduation', school_name: academicData.Graduation.schoolName, percentage: academicData.Graduation.percentage },
        { education: 'Post Graduation', school_name: academicData.PostGraduation.schoolName, percentage: academicData.PostGraduation.percentage }
      ]
    };

    try {
      const response = await axios.post('http://localhost:5000/academic-info', dataToSend);
      console.log('Server response:', response.data);
      navigate('/work-experience');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
      <h2>Academic Info</h2>
      {errors.global && <div className="alert alert-danger">{errors.global}</div>}
      <form onSubmit={handleSubmit}>
        <table className="table">
          <thead>
            <tr>
              <th>Education</th>
              <th>School Name</th>
              <th>Percentage/CGPA</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(academicData).map((level, index) => (
              <tr key={index}>
                <td>{level}</td>
                <td>
                  <input
                    type="text"
                    className={`form-control ${errors[level].schoolName ? 'is-invalid' : ''}`}
                    name="schoolName"
                    value={academicData[level].schoolName}
                    onChange={(e) => handleInputChange(e, level)}
                  />
                  {errors[level].schoolName && <div className="invalid-feedback">{errors[level].schoolName}</div>}
                </td>
                <td>
                  <input
                    type="number"
                    className={`form-control ${errors[level].percentage ? 'is-invalid' : ''}`}
                    name="percentage"
                    value={academicData[level].percentage}
                    onChange={(e) => handleInputChange(e, level)}
                  />
                  {errors[level].percentage && <div className="invalid-feedback">{errors[level].percentage}</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" className="btn btn-primary me-2">Submit</button>
      </form>
      <button type="button" className="btn btn-secondary" onClick={prevStep}>Prev</button>
    </div>
  );
};

export default AcademicInfo;
