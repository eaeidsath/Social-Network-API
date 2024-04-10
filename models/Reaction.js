const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (date) => date.toLocaleString(),
        }
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;