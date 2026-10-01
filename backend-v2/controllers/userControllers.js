const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../utils/config');

const createToken = (_id) => {
  return jwt.sign({ _id }, config.SECRET, { expiresIn: '3d' });
};

// POST /api/auth/signup
const signupUser = async (req, res) => {
  const {
    name,
    username,
    password,
    phone_number,
    licenseNumber,
    date_of_birth,
    address,
  } = req.body;

  if (!name || !username || !password || !phone_number || !licenseNumber || !date_of_birth) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!address || !address.licenseExpiryDate || !address.city || !address.yearsOfExperience === undefined) {
    return res.status(400).json({ error: 'All address fields are required' });
  }
  try {
    const usernameTaken = await User.findOne({ username });
    if (usernameTaken) {
      return res.status(400).json({ error: 'Username already in use' });
    }
    const licenseTaken = await User.findOne({ licenseNumber });
    if (licenseTaken) {
      return res.status(400).json({ error: 'License number already in use' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      phone_number,
      licenseNumber,
      date_of_birth,
      address,
    });

    const token = createToken(user._id);
    res.status(201).json({ username: user.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST /api/auth/login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = createToken(user._id);
    res.status(200).json({ username: user.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };