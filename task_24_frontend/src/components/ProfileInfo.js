
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from './FormContext';

const ProfileInfo = () => {
  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();
  const [skills, setSkills] = useState(formData.profileInfo.skills || {});

  useEffect(() => {
    setSkills(formData.profileInfo.skills || {});
  }, [formData]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSkills(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      profileInfo: { skills },
    }));
    navigate('/academic-info');
  };

  return (
    <div>
      <h2>Profile Info</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Skills:</label>
          <div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" name="mysql" checked={skills.mysql || false} onChange={handleCheckboxChange} />
              <label className="form-check-label">MySQL</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" name="java" checked={skills.java || false} onChange={handleCheckboxChange} />
              <label className="form-check-label">Java</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" name="javascript" checked={skills.javascript || false} onChange={handleCheckboxChange} />
              <label className="form-check-label">JavaScript</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" name="react" checked={skills.react || false} onChange={handleCheckboxChange} />
              <label className="form-check-label">React</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" name="springboot" checked={skills.springboot || false} onChange={handleCheckboxChange} />
              <label className="form-check-label">Spring Boot</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" name="aws" checked={skills.aws || false} onChange={handleCheckboxChange} />
              <label className="form-check-label">AWS</label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <button type="button" className="btn btn-secondary" onClick={() => navigate('/personal-info')}>Prev</button>
    </div>
  );
};

export default ProfileInfo;
