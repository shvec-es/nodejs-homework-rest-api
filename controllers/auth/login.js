const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../../models');
const {SECRET_KEY} = process.env;

const login = async (req, res) => {
  const {password, email} = req.body;
  try {
    const user = await User.findOne({email});
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!user || !user.verify || !comparePassword) {
      return res.status(401).json({
        type: 'error',
        status: 401,
        message: 'Email or password is wrong or email is not verify',
      });
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
    await User.findByIdAndUpdate(user._id, {token});
    return res.json({
      status: 'success',
      code: 200,
      data: {
        token,
        user: {email, subscription: user.subscription},
      },
    });
  } catch (error) {
    return res
        .status(400)
        .json({status: 'error', code: 400, message: error.message});
  }
};

module.exports = login;
