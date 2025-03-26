const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const redis = require('redis');
const { promisify } = require('util');
const User = require('../models/User');
const { sendOTP } = require('../utils/email');

const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await argon2.hash(password);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

const generateToken = (req, res) => {
  const { user } = req;
  const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

const setup2FA = async (req, res) => {
  const { user } = req;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await setAsync(`otp:${user.id}`, otp, 'EX', 300); // OTP expires in 5 minutes
  await sendOTP(user.email, otp);
  res.json({ message: 'OTP sent to your email' });
};

const verify2FA = async (req, res) => {
  const { user } = req;
  const { otp } = req.body;
  const storedOtp = await getAsync(`otp:${user.id}`);
  if (storedOtp === otp) {
    res.json({ message: '2FA verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
};

module.exports = {
  signup,
  login,
  generateToken,
  setup2FA,
  verify2FA,
};
