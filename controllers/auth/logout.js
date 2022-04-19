const {User} = require('../../models');

const logout = async (req, res) => {
  const {_id} = req.user;
  const user = await User.findByIdAndUpdate(_id, {token: null});
  if (!user) {
    return res.status(401).json({
      type: 'error',
      status: 401,
      message: 'Not authorized',
    });
  }
  res.status(204).json();
};

module.exports = logout;
