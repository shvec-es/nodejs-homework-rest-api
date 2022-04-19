const {User} = require('../../models');

const updateSubscription = async (req, res) => {
  const {_id, email} = req.user;
  const {subscription} = req.body;
  try {
    const updatedSubscription = await User.findByIdAndUpdate(
        _id,
        {subscription},
        {
          new: true,
        },
    );
    if (!updatedSubscription) {
      return res.status(400).json({message: 'Missing field subscription'});
    }
    return res.json({
      status: 'success',
      code: 200,
      data: {
        user: {email, subscription},
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = updateSubscription;
