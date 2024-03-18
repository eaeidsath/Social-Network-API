const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

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
        thoughts: [thoughtSchema],
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
        return `${this.first} ${this.last}`;
    })
    .set(function (v) {
        const first = v.split(' ')[0];
        const last = v.split(' ')[1];
        this.set({ first, last });
    });

const User = model('user', userSchema);

module.exports = User;