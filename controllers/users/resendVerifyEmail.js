const {v4: uuidv4} = require('uuid');
const {User} = require('../../models');
const sendEmail = require('../../helpers/sendEmail');

const resendVerifyEmail = async (req, res) => {
  const {email} = req.body;
  if (!email) {
    return res.status(400).json({
      type: 'error',
      status: 400,
      message: 'Missing required field email',
    });
  }
  const user = await User.findOne({email});
  if (user && user.verify) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Verification has already been passed',
    });
  }
  const verificationToken = uuidv4();
  const mail = {
    to: email,
    subject: 'Подтверждение email',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердите email</a>`,
  };
  await sendEmail(mail);
  return res.json({
    message: 'Verification email sent',
  });
};

module.exports = resendVerifyEmail;
