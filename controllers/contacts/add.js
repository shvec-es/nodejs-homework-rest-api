const {Contact} = require('../../models');

const add = async (req, res) => {
  const {_id} = req.user;
  try {
    const newContact = await Contact.create({...req.body, owner: _id});
    return res
        .status(201)
        .json({status: 'success', code: 201, data: newContact});
  } catch (error) {
    return res
        .status(400)
        .json({status: 'error', code: 400, message: 'Not found'});
  }
};

module.exports = add;
