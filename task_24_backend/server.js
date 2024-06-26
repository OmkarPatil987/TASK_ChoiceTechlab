const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const multer = require('multer'); 
const cors = require('cors'); 
const app = express();
app.use(bodyParser.json());
app.use(cors()); 

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Omkar@123',
  database: 'omkar'
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected!');
});

const upload = multer({ dest: 'uploads/' });

app.post('/personal-info', upload.single('resume'), (req, res) => {
  const { name, dob, address, mobile, email } = req.body;
  const resume = req.file; 
  

  const sql = 'INSERT INTO personal_info (name, dob, address, mobile, email, resume) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, dob, address, mobile, email, resume.filename], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
      return;
    }
    console.log('Inserted:', result);
    res.send('Personal info saved');
  });
});


app.post('/profile-info', (req, res) => {
    const { skills } = req.body;
  
   
    if (!Array.isArray(skills)) {
      return res.status(400).json({ error: 'Skills must be an array' });
    }
  

    const sql = 'INSERT INTO profile_info (skills) VALUES (?)';
    db.query(sql, [skills.join(', ')], (err, result) => {
      if (err) {
        console.error('Error saving profile info:', err);
        return res.status(500).json({ error: 'Error saving profile info' });
      } else {
        console.log('Profile info saved successfully');
        return res.status(200).json({ message: 'Profile info saved' });
      }
    });
  });


app.post('/academic-info', (req, res) => {
    const academicData = req.body.academicData;
  
   
    const sql = 'INSERT INTO academic_info (education, school_name, percentage) VALUES ?';
    
  
    const values = academicData.map(item => [item.education, item.school_name, item.percentage]);
  
    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error('Error saving academic info:', err);
        return res.status(500).json({ error: 'Error saving academic info' });
      }
      console.log('Academic info saved successfully');
      return res.status(200).json({ message: 'Academic info saved' });
    });
  });

  app.post('/work-experience', (req, res) => {
    const { company, joinDate, leaveDate } = req.body;
  
    if (!company || !joinDate || !leaveDate) {
      return res.status(400).json({ error: 'All fields are mandatory' });
    }
  

    const sql = 'INSERT INTO work_experience (company_name, join_date, leave_date) VALUES (?, ?, ?)';
    db.query(sql, [company, joinDate, leaveDate], (err, result) => {
      if (err) {
        console.error('Error saving work experience:', err);
        return res.status(500).json({ error: 'Error saving work experience' });
      }
      console.log('Work experience saved successfully');
      res.status(200).json({ message: 'Work experience saved' });
    });
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
