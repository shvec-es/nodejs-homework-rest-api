const express = require('express');

const {validation, auth, upload} = require('../../middlewares');
const {users} = require('../../controllers');
const {userUpdateSubscriptionSchema} = require('../../schemas');

const router = new express.Router();

router.get('/current', auth, users.getCurrent);
router.patch('/avatars', auth, upload.single('avatar'), users.updateAvatar);
router.patch(
    '/',
    auth,
    validation(userUpdateSubscriptionSchema),
    users.updateSubscription,
);

module.exports = router;
