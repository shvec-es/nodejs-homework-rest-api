const path = require('path');
const fs = require('fs/promises');
const {User} = require('../../models');
const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const {path: tempUpload, originalname} = req.file;
  const {_id: id} = req.user;
  const uniqueName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, uniqueName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('public', 'avatars', uniqueName);
    await User.findByIdAndUpdate(req.user._id, {avatarURL});
    res.json({avatarURL});
    Jimp.read(avatarURL, (err, avatar) => {
      if (err) throw err;
      avatar.resize(250, 250).quality(60).write(avatarURL);
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
