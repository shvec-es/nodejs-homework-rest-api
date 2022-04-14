const {Contact} = require('../../models');

const updateById = async (req, res) => {
  const {contactId} = req.params;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        req.body,
        {
          new: true,
        },
    ).populate('owner', 'email subscription');
    if (!updatedContact) {
      throw new Error(error.message);
    }
    return res.json({status: 'success', code: 200, data: updatedContact});
  } catch (error) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id=${contactId} not found`,
    });
  }
};

module.exports = updateById;
