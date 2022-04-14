const {Contact} = require('../../models');

const getAll = async (req, res) => {
  const {_id} = req.user;
  const {page = 1, limit = 10, favorite = false} = req.query;
  const skip = (page - 1) * limit;
  const params = {
    owner: _id,
  };
  const options = {
    skip,
    limit: Number(limit),
  };
  if (favorite) {
    params.favorite = favorite;
    options.favorite = favorite;
  }
  const contacts = await Contact.find(params, '', options).populate(
      'owner',
      'email subscription',
  );
  return res.json({status: 'success', code: 200, data: contacts});
};

module.exports = getAll;
