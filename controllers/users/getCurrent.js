const getCurrent = async (req, res) => {
  const {email, subscription} = req.user;
  try {
    res.json({
      status: 'success',
      code: 200,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getCurrent;
