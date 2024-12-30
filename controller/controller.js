const User = require('../database/models/users'); // Import the User model
const bcrypt = require('bcrypt'); // Import bcrypt

exports.loginsubmit = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email using Sequelize
        const user = await User.findOne({ where: { user_email: email } });

        if (!user) {
            return res.status(401).send('Invalid email or password'); // User not found
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.user_password);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid email or password'); // Password mismatch
        }

        // Store user information in the session
        req.session.user = {
            id: user.user_id,
            name: user.user_name,
            email: user.user_email,
        };

        console.log('Session created:', req.session.user);

        // Redirect to the dashboard after successful login
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal server error');
    }
};



exports.login = async (req, res) => {
    console.log('Cat!');
    res.render('login'); // Renders the "login.ejs" file from the views folder
    };

exports.dashboard = async (req, res) => {
        console.log('Mouse!');
        res.render('dashboard'); 
        };



    exports.logout = (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Logout failed');
            }
            res.redirect('/login');
        });
    };
    
    
    
    
exports.register = async (req, res) => {
    console.log('Dog!');
    res.render('register'); 
    };



    exports.registersubmit= async (req, res) => {
        try {
            const { name, email, password, zz } = req.body;
            console.log(`Name: ${name}, Email: ${email}, Password: ${password}, Number: ${zz}`);
    
            // Check if the email already exists in the database
            const existingUser = await User.findOne({ where: { user_email: email } });
            if (existingUser) {
                return res.status(400).send('Email is already registered. Please use a different email.');
            }
    
            // Hash the password before saving to the database
            const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    
            // Create a new user in the database with the hashed password
            const newUser = await User.create({
                user_name: name,
                user_email: email,
                user_password: hashedPassword, // Store the hashed password
                user_number: zz,
                role_id: 1 // Assuming role_id is 1, adjust based on your roles
            });
    
            // Redirect to the login page after successful registration
            res.redirect('/login'); // Or render a success page with a message
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('There was an error saving the user.');
        }
    };