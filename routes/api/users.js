const express = require('express');

const {validation, auth} = require('../../middlewares');
const {users} = require('../../controllers');
const {userUpdateSubscriptionSchema} = require('../../schemas');

const router = new express.Router();

router.get('/current', auth, users.getCurrent);
router.patch(
    '/',
    auth,
    validation(userUpdateSubscriptionSchema),
    users.updateSubscription,
);

module.exports = router;
