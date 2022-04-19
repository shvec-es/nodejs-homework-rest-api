const express = require('express');

const {validation, auth: authMw} = require('../../middlewares');
const {userSignupJoiSchema, userLoginJoiSchema} = require('../../schemas');
const {auth} = require('../../controllers');

const router = new express.Router();

router.post('/signup', validation(userSignupJoiSchema), auth.signup);
router.post('/login', validation(userLoginJoiSchema), auth.login);
router.get('/logout', authMw, auth.logout);

module.exports = router;
