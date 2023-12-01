/**
 * Bugs Creators API
 * 
 * Comment controller and model integration
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Modules
const dotenv = require('dotenv');
const msg = require('./../helpers/msg');

// Entity models
const commentModel = require('./../models/comment');
const postModel = require('./../models/post');
const userModel = require('./../models/user');

// Twilio service
dotenv.config(); // Load account details
const TWILIO_NUMBER = process.env.TWILIO_NUMBER;
const TWILIO_SID = process.env.TWILIO_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(TWILIO_SID, TWILIO_AUTH_TOKEN);

// New comment WhatsApp message template
const messageTemplate = (postTitle, commentAuthor, comment) => {
    shortTitle = postTitle.slice(0, 30);
    shortComment = comment.slice(0, 100);

return `*New comment* on post "${shortTitle + ((postTitle.length > 30) ? '...' : '')}"

_${commentAuthor}_ says: ${shortComment + ((comment.length > 100) ? '...' : '')}

Log into your Bug's Creators account to see more detail`;
}

module.exports = {
    // GET
    getComment: (req, res) => {
        const comment_id = req.query.comment_id;

        if (comment_id) {
            commentModel.findById(comment_id).lean().then(response => {
                if (response) return res.status(200).send(response);
                return res.status(404).send(msg('Comment not found.'));
            });
            return;
        }

        return res.status(400).send(msg('Comment ID not provided.'));
    },

    // POST
    createComment: (req, res) => {
        try {
            const user_id = req.user.id;
            const post_id = req.body.post_id;

            if (post_id) {
                // First search if post to comment exists
                postModel.findById(post_id).lean().then(async response => {
                    if (!response) return res.status(404).send('Post not found.');

                    // Post exists
                    const description = req.body.description;
                    if (description) {
                        // Ignore all other keys
                        comment_data = {
                            post_id: post_id,
                            user_id: user_id,
                            description: description
                        };

                        const result = await commentModel.create(comment_data);
                        if (result) {
                            res.status(201).send({comment_id: result._id});

                            // Notify user via WhatsApp if needed
                            if (process.env.ENABLE_TWILIO === "true" && res_post.notifyUser === true) {
                                userModel.findById(user_id).lean().then(res_notify => {
                                    if (!res_notify.phone) {
                                        console.log(`User "${res_notify.username}" has no phone registered`);
                                        return;
                                    }
                                    
                                    twilioClient.messages.create({
                                        from: `whatsapp:${TWILIO_NUMBER}`,
                                        body: messageTemplate(res_post.title, res_user.username, comment_data.description),
                                        to: `whatsapp:+521${res_notify.phone}`
                                    }).then(
                                        message => console.log(`Message ${message.sid} successfully sent`)
                                    ).catch(
                                        err => console.log(`Unable to send notification => ${err}`)
                                    );
                                });
                            }
                            return;
                        }
                        return res.status(409).send(msg('Unable to create comment.', 'Database returned no results.'));
                    }

                    res.status(400).send(msg('Comment description not provided.'));
                });
                return;
            }

            res.status(400).send(msg('Post id not provided.'));
        } catch (error) {
            res.status(409).send(msg('Unable to create comment.', error));
        }
    },

    // PUT
    editComment: async (req, res) => {
        const user_id = req.user.id;
        const comment_id = req.body.comment_id;
        const description = req.body.description;

        if (comment_id) {
            if (description) {
                // Ignore all other keys
                const newData = {
                    description: description
                };

                // Ignore null fields and return updated document after operation
                opts = { new: true, omitUndefined: true };
                doc = await commentModel.findOneAndUpdate({
                    _id: comment_id,
                    user_id: user_id
                }, newData, opts);

                if (doc) return res.status(200).send(doc);
                return res.status(404).send(msg('Comment not found or not owned by user.'));
            }

            return res.status(400).send(msg('Comment data not provided.'));
        }

        res.status(400).send(msg('Comment ID not provided.'));
    },

    // PATCH
    rateComment: async (req, res) => {
        const user_id = req.user.id;
        const comment_id = req.body.comment_id;
        const remove = req.body.remove;
        const rate = req.body.rate;

        if (comment_id) {
            const comment = await commentModel.findById(comment_id);
            if (!comment) return res.status(404).send(msg('Comment not found.'));

            // Comment author tries to perform an auto-rate
            if (user_id == comment.user_id) return res.status(403).send(msg('Comment author can\'t rate their own comment.'));

            // Check if user is in comment raters
            const rated_comment = comment.ratedBy.find(u => u.user_id == user_id);
            if (rated_comment) { // Comment already rated
                if (remove && remove === true) { // Remove user rate from comment and update score
                    const update = await commentModel.findByIdAndUpdate(
                        { _id: comment_id },
                        { $inc: { score: -rated_comment.rate } , $pull: { ratedBy: { user_id: user_id } } },
                        { new: true }
                    );
                    return res.status(200).send(update); // Comment rate removed successfully
                }

                if (!rate || typeof rate !== "number" || !(1 - Math.abs(rate) == 0))
                    return res.status(422).send('Incorrect rate format.');

                if (rate == rated_comment.rate) return res.status(204).send(); // Same rate

                // User changes rate from positive to negative or vice versa
                const update = await commentModel.findByIdAndUpdate(
                    { _id: comment_id },
                    {
                        $inc: { score: (rate > rated_comment.rate) ? 2 : -2 },
                        $set: { "ratedBy.$[u].rate": rate } 
                    },
                    { arrayFilters: [ {"u.user_id": user_id} ], new: true, upsert: true}
                );
    
                return res.status(200).send(update); // Comment rate changed successfully
            } 
            
            // Comment not rated yet
            if (!rate || typeof rate !== "number" || !(1 - Math.abs(rate) == 0))
                return res.status(422).send('Incorrect rate format.');

            const update = await commentModel.findByIdAndUpdate(
                { _id: comment_id },
                { 
                    $inc: { score: rate },
                    $push: { ratedBy: { user_id, rate } }
                },
                { new: true }
            );

            return res.status(200).send(update); // Comment rated successfully
        }

        res.status(400).send(msg('Comment id not provided.'));
    },

    // DELETE
    deleteComment: (req, res) => {
        const user_id = req.user.id;
        const comment_id = req.body.comment_id;

        if (comment_id) {
            commentModel.findOneAndDelete({ _id: comment_id, user_id: user_id }).lean().then(response => {
                if (response) return res.status(200).send(msg('Successfully deleted comment.'));
                return res.status(404).send(msg('Comment not found or not owned by user.'));
            });
            return;
        }

        res.status(400).send(msg('Comment ID not provided.'));
    }
};
