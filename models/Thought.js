
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: date => dataFormat(date, 'dddd,mmm dS, yyyy')
        },
        username: [
            {
                type: String,
                required: true
            }
        ],
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
)

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})




const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            max: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: date => dataFormat(date, 'dddd,mmm dS, yyyy')
        }
    }
)

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;