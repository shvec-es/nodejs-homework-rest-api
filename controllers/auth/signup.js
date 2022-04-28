const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const {v4: uuidv4} = require('uuid');
const {User} = require('../../models');
const sendEmail = require('../../helpers/sendEmail');

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
    const verificationToken = uuidv4();
    await User.create({
      password: hashPassword,
      email,
      avatarURL,
      subscription,
      verificationToken,
    });
    const mail = {
      to: email,
      subject: 'Подтверждение email',
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердите email</a>`,
    };
    await sendEmail(mail);
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {user: {email, avatarURL, subscription, verificationToken}},
    });
  } catch (error) {
    console.log(error);
    return res
        .status(400)
        .json({status: 'error', code: 400, message: error.message});
  }
};

module.exports = signup;
