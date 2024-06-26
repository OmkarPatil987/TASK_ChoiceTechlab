
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormContext } from './FormContext';

const WorkExperience = () => {
  const { formData, setFormData } = useContext(FormContext);
  const [experiences, setExperiences] = useState(formData.workExperience);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const prevStep = () => {
    navigate('/academic-info');
  };

  const handleChange = (e, index, field) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = e.target.value;
    if (field === 'leaveDate') {
      // Calculate diffDays when leaveDate is changed
      const joinDate = new Date(newExperiences[index].joinDate);
      const leaveDate = new Date(e.target.value);
      const diffDays = Math.ceil((leaveDate - joinDate) / (1000 * 60 * 60 * 24));
      newExperiences[index].diffDays = diffDays;
    }
    setExperiences(newExperiences);
  };

  const handleAddExperience = () => {
    setExperiences([...experiences, { company: '', joinDate: '', leaveDate: '', diffDays: 0 }]);
  };

  const handleDeleteExperience = (index) => {
    const newExperiences = experiences.filter((_, expIndex) => expIndex !== index);
    setExperiences(newExperiences);
  };

  const handleSubmit = async () => {
    const newErrors = [];
    experiences.forEach((exp, index) => {
      if (!exp.company || !exp.joinDate || !exp.leaveDate) {
        newErrors[index] = 'All fields are mandatory';
      } else {
        const joinDate = new Date(exp.joinDate);
        const leaveDate = new Date(exp.leaveDate);
        const diffDays = Math.ceil((leaveDate - joinDate) / (1000 * 60 * 60 * 24));
        if (diffDays < 15) {
          newErrors[index] = 'Leave date must be at least 15 days after join date';
        }
        // Set diffdays to the experience object for display
        exp.diffDays = diffDays;
      }
    });

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Update formData with new experiences
      setFormData(prevFormData => ({
        ...prevFormData,
        workExperience: experiences
      }));

      // Save data to backend
      for (const exp of experiences) {
        await axios.post('http://localhost:5000/work-experience', exp);
      }
      alert('All work experiences saved!');
    } catch (error) {
      console.error('Error saving work experiences', error);
    }
  };

  return (
    <div>
      <h2>Work Experience</h2>
      <form>
        <table className="table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Join Date</th>
              <th>Leave Date</th>
              <th>Days Difference</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    placeholder="Company Name"
                    className={`form-control ${errors[index] ? 'is-invalid' : ''}`}
                    onChange={(e) => handleChange(e, index, 'company')}
                    value={exp.company}
                  />
                  {errors[index] && <div className="invalid-feedback">{errors[index]}</div>}
                </td>
                <td>
                  <input
                    type="date"
                    className={`form-control ${errors[index] ? 'is-invalid' : ''}`}
                    onChange={(e) => handleChange(e, index, 'joinDate')}
                    value={exp.joinDate}
                  />
                  {errors[index] && <div className="invalid-feedback">{errors[index]}</div>}
                </td>
                <td>
                  <input
                    type="date"
                    className={`form-control ${errors[index] ? 'is-invalid' : ''}`}
                    onChange={(e) => handleChange(e, index, 'leaveDate')}
                    value={exp.leaveDate}
                  />
                  {errors[index] && <div className="invalid-feedback">{errors[index]}</div>}
                </td>
                <td>{exp.diffDays}</td>
                <td>
                  <button type="button" className="btn btn-danger" onClick={() => handleDeleteExperience(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn btn-secondary" onClick={prevStep}>
          Previous
        </button>
        <button type="button" className="btn btn-primary" onClick={handleAddExperience}>
          Add Experience
        </button>
        <button type="button" className="btn btn-success" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default WorkExperience;
