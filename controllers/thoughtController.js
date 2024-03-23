const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.ThoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No Thought with this Id.' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const updateThought = await Thought.findOneAndUpdate(
                { _id: req.params.ThoughtId },
                { $set: req.body },
                { runValidators: true, new: true}
            );

            if (!updateThought) {
                return res.status(404).json({ message: 'No Thought with this Id.' });
            }

            res.json(updateThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.ThoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No Thought with this Id.'});
            }

            res.json({ message: 'Thought successfully deleted with associated thoughts.' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.ThoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true}
            );

            if (!thought) {
                return res.status(404).json({ message: 'No Thought with this Id.'});
            }

            res.json(thought);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.ThoughtId },
                { $pull: { reactions: { reactionsId: req.params.reactionsId } } },
                { runValidators: true, new: true}
            );

            if (!thought) {
                return res.status(404).json({ message: 'No Thought with this Id.'});
            }

            res.json(thought);
        } catch(err) {
            res.status(500).json(err);
        }
    }
};