const express = require('express');

const {validation, auth} = require('../../middlewares');
const {joiSchema, statusJoiSchema} = require('../../schemas');
const {contacts} = require('../../controllers');

const router = new express.Router();

router.get('/', auth, contacts.getAll);
router.get('/:contactId', auth, contacts.getById);
router.post('/', auth, validation(joiSchema), contacts.add);
router.delete('/:contactId', auth, contacts.removeById);
router.put('/:contactId', auth, validation(joiSchema), contacts.updateById);
router.patch(
    '/:contactId/favorite',
    auth,
    validation(statusJoiSchema),
    contacts.updateStatusContact,
);

module.exports = router;
