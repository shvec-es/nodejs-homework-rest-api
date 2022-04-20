const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const {User} = require('../../models');

const signup = async (req, res) => {
  const {password, email, subscription} = req.body;
  try {
    const user = await User.findOne({email});
    if (user) {
      return res
          .status(409)
          .json({type: 'error', status: 409, message: 'Email in use'});
    }
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({
      password: hashPassword,
      email,
      avatarURL,
      subscription,
    });
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {user: {email, avatarURL, subscription}},
    });
  } catch (error) {
    return res
        .status(400)
        .json({status: 'error', code: 400, message: error.message});
  }
};

module.exports = signup;
