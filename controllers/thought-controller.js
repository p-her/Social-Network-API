const { json } = require('express/lib/response');
const { Thought, User } = require('../models');

const thoughtController = {
    addThought({ params, body }, res){
        console.log(params);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    {$push: { thoughts: _id }},
                    { new: true }
                )
            })
            .then(dbUserData => {
                console.log(dbUserData);
                if(!dbUserData){
                    res.status(404).json({ message: 'No user found with this id! '});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    },
   
    addReaction({ params, body }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            {$push: { reactions: body}},
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: 'No user found with this id! '});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // remove thought
    removeThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if(!deletedThought){
                    return res.status(404).json({ message: 'No thought with this id '});
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId }},
                    { new: true }
                )
            })
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: 'No user found with this id '});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err));
    },
    removeReaction({ params }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: {reactions: {reactionId: params.reactionId }}},
            { new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
    getThought(req, res){
        Thought.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.sendStatus(400);
            })
    },
    getThoughtById({ params }, res){
        Thought.findOne({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })

    },
    updateThought({ params, body }, res){
        Thought.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true })
            .then(dbUserData => {
                if(!dbUserData){
                    res.sendStatus(404).json({ message: 'No thought found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;