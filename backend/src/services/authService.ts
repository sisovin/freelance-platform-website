const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const redis = require('redis');
const { promisify } = require('util');
const User = require('../models/User');
const { sendOTP } = require('../utils/email');

const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

const signup = async (username, email, password) => {
  const hashedPassword = await argon2.hash(password);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const isMatch = await argon2.verify(user.password, password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }
  const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

const generateToken = (user) => {
  const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

const setup2FA = async (user) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await setAsync(`otp:${user.id}`, otp, 'EX', 300); // OTP expires in 5 minutes
  await sendOTP(user.email, otp);
};

const verify2FA = async (user, otp) => {
  const storedOtp = await getAsync(`otp:${user.id}`);
  if (storedOtp !== otp) {
    throw new Error('Invalid OTP');
  }
};

module.exports = {
  signup,
  login,
  generateToken,
  setup2FA,
  verify2FA,
};
