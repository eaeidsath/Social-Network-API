const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with this Id.' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const updateUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true}
            );

            if (!updateUser) {
                return res.status(404).json({ message: 'No user with this Id.' });
            }

            res.json(updateUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with this Id.'});
            }

            const thought = await Thought.deleteMany({ _id: { $in: user.thoughts } });

            if (!thought) {
                return res.status(404).json({ message: 'User deleted, but no thoughts found.' });
            }

            res.json({ message: 'User successfully deleted with associated thoughts.' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true}
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with this Id.'});
            }

            res.json(user);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true}
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with this Id.'});
            }

            res.json(user);
        } catch(err) {
            res.status(500).json(err);
        }
    }
};