const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema');

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, '05ebb14a84aabcf4747f7481859dceea01b591f225cf7580a353fc3122fd7539')

        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred' });
    }
}

module.exports = {
    registerUser,
    loginUser
};