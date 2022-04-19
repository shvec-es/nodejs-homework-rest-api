const {Schema, model} = require('mongoose');

const contactsSchema = new Schema(
    {
      name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
        unique: true,
      },
      phone: {
        type: String,
      },
      favorite: {
        type: Boolean,
        default: false,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
    },
    {versionKey: false, timestamps: true},
);

const Contact = model('contact', contactsSchema);

module.exports = {Contact};
