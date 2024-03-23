const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function(email) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
                },
                message: 'Please enter a valid email address.'
            }
        },
        thoughts: [{
            type: Schema.Types.ObjectId, ref: 'thought',
        }],
        friends: [{
            type: Schema.Types.ObjectId, ref: 'user',
        }]
    },
    {
        toJSON: {
          virtuals: true,
        },
    }
);

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;