const {User} = require('../../models');

const verifyEmail = async (req, res) => {
  const {verificationToken} = req.params;

  const user = await User.findOne({verificationToken});
  if (!user) {
    res.json({
      status: 'error',
      code: 404,
      message: 'User not found',
    });
    throw new Error(error.message);
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.json({
    message: 'Verification successful',
  });
};

module.exports = verifyEmail;
