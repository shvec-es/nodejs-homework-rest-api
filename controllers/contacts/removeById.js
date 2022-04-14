const {Contact} = require('../../models');

const removeById = async (req, res) => {
  const {contactId} = req.params;
  try {
    const deletedContact = await Contact.findByIdAndRemove(contactId).populate(
        'owner',
        'email subscription',
    );
    if (!deletedContact) {
      throw new Error(error.message);
    }
    return res.json({
      status: 'success',
      code: 200,
      message: 'Contact deleted',
      data: deletedContact,
    });
  } catch (error) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id=${contactId} not found`,
    });
  }
};

module.exports = removeById;
