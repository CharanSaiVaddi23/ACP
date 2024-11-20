// Import required modules
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Initialize express app
const app = express();
app.use(cors()); // Enable CORS if your frontend is hosted separately
app.use(bodyParser.json()); // Parse JSON bodies

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected!');
});

const util = require('util');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation

app.post('/register', async (req, res) => {
    const { userType, srn, name, email, password, department, jobRole, company } = req.body;

    // Input validation
    if (!userType || !srn || !name || !email || !password ||
        (userType === 'student' && !department) ||
        (userType === 'alumni' && (!jobRole || !company))) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    // Email format validation
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Define SQL query and values based on userType
        let sql, values;
        if (userType === 'student') {
            sql = 'INSERT INTO student (srn, name, email, password, department) VALUES (?, ?, ?, ?, ?)';
            values = [srn, name, email, hashedPassword, department];
        } else if (userType === 'alumni') {
            sql = 'INSERT INTO alumni (a_srn, a_name, a_email, password, jobRole, company) VALUES (?, ?, ?, ?, ?, ?)';
            values = [srn, name, email, hashedPassword, jobRole, company];
        } else {
            return res.status(400).json({ error: 'Invalid user type.' });
        }

        // Use promisified query to handle async/await
        const query = util.promisify(db.query).bind(db);

        // Check for existing user with the same email or srn
        // const checkSql = 'SELECT * FROM ?? WHERE email = ? OR srn = ?';
        const checkSql = `
  SELECT * FROM ??
  WHERE NOT EXISTS (
    SELECT 1 FROM ?? WHERE email = ? OR srn = ?
  )
`;
        const tableName = userType === 'student' ? 'student' : 'alumni';
        const existingUser = await query(checkSql, [tableName, email, srn]);

        if (existingUser.length > 0) {
            return res.status(409).json({ error: 'User with this SRN or email already exists.' });
        }

        // Execute registration query
        await query(sql, values);
        const userTypeText = userType.charAt(0).toUpperCase() + userType.slice(1);
        res.status(201).json({ message: `${userTypeText} registered successfully!` });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'An unexpected server error occurred.' });
    }
});


app.post('/login', (req, res) => {
    const { srn, password, userType } = req.body;

    // Validate user type
    if (userType !== 'student' && userType !== 'alumni') {
        return res.status(400).json({ error: 'Invalid user type' });
    }

    // Determine the table and field based on user type
    const table = userType === 'student' ? 'student' : 'alumni';
    const srnField = userType === 'student' ? 'srn' : 'a_srn';  // Use a_srn for alumni

    // SQL query to find the user
    const sql = `SELECT * FROM ${table} WHERE ${srnField} = ?`;
    db.query(sql, [srn], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Server error occurred during login' });
        }

        if (results.length === 0) {
            // If no user is found, respond with a 'not registered' message
            return res.status(404).json({ error: 'User not registered' });
        }

        const user = results[0];
        
        // Check password validity
        if (bcrypt.compareSync(password, user.password)) {
            // Successful login logic...
            // (Your existing profile handling logic goes here)
        } else {
            // Invalid credentials case
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});


app.get('/api/notifications/', (req, res) => {
    const { recipient_id, page = 1, limit = 10 } = req.query;
    
    if (!recipient_id) {
        return res.status(400).send('recipient_id is required');
    }

    const offset = (page - 1) * limit;
    const sql = `SELECT * FROM Notification`;
    
    db.query(sql, [recipient_id, limit, offset], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to retrieve notifications');
        }
        res.status(200).json(results);
    });
});



// POST route to create a new event
app.post('/api/events', (req, res) => {
    const { title, event_desc, contact_info } = req.body;

    // Input validation to ensure all fields are provided
    if (!title || !event_desc || !contact_info) {
        return res.status(400).send('Please provide all required fields (title, event_desc, contact_info).');
    }

    const sql = 'INSERT INTO event (title, event_desc, contact_info) VALUES (?, ?, ?)';
    
    db.query(sql, [title, event_desc, contact_info], (err, result) => {
        if (err) {
            console.error("Error posting event:", err);
            return res.status(500).send('Server error');
        }
        res.status(201).send('Event posted successfully');
    });
});

// Endpoint for fetching alumni profiles
app.get('/api/alumni', (req, res) => {
    const sql = `SELECT A_SRN, A_Name, A_email, Jobrole, company FROM alumni`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to retrieve alumni profiles');
        }
        res.status(200).json(results);
    });
});

app.post('/feedback', (req, res) => {
    const { content, stud_srn } = req.body; // Get feedback content and student SRN from the request body

    // Basic validation to ensure that both content and stud_srn are provided
    if (!content || !stud_srn) {
        return res.status(400).send('Please provide both content and student SRN.');
    }

    // SQL query to call the stored procedure
    const query = 'CALL InsertFeedback(?, ?)'; // Call the InsertFeedback procedure

    // Execute the query
    db.query(query, [content, stud_srn], (err, result) => {
        if (err) {
            console.error('Error inserting feedback:', err);
            return res.status(500).send('Server error');
        }

        // If the query is successful, send a success message
        res.status(201).send('Feedback uploaded successfully!');
    });
});


// GET route to fetch events
app.get('/events', (req, res) => {
    const sql = 'SELECT * FROM event';
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching events:', err);
        return res.status(500).send('Failed to retrieve events');
      }
      res.status(200).json(results); // Send the event data as a JSON response
    });
  });

// Endpoint for students to fetch their notifications
app.get('/api/notifications/', (req, res) => {
    // const recipient_id = req.params.recipient_id;

    const sql = `SELECT * FROM notification`;
    db.query(sql, [recipient_id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to retrieve notifications');
        }
        console.log(results)
        res.status(200).json(results);
    });
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

