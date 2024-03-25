const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// api/thoughts
router.route('/').get(getThoughts).post(createThought);

// api/thoughts/:ThoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// api/thoughts/:ThoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// api/thoughts/:ThoughtId/reactions/:ReactionID
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;