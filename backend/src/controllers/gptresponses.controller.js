/**
 * Bugs Creators API
 * 
 * GPT response controller and model integration
 * 
 * Made by:
 *  IS735003 - Cristian Ochoa Navarrete
 *  IS727272 - Marco Ricardo Cordero Hernández 
 */

// Modules
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const msg = require('./../helpers/msg');

// Entity models
const GPTModel = require('./../models/gptresponse');
const postModel = require('./../models/post');

// OpenAI service
dotenv.config(); // Load OpenAI Key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

module.exports = {
    // GET
    getGPTResponses: async (req, res) => {
        const user_id = req.user.id;
        const post_id = req.params.post_id;

        if (post_id) {
            const post = await postModel.find({ _id: post_id, user_id: user_id });
            if (!post) return res.status(404).send(msg('Post not found or not owned by user.'));

            const responses = [];
            (await GPTModel.find({ post_id: post_id })).forEach(
                response => responses.push(response.contents)
            );
            return res.status(200).send(responses);
        }

        return res.status(400).send(msg('Post id not provided.'));
    },

    // POST
    GPTCall: (req, res) => {
        const user_id = req.user.id;
        const post_id = req.body.post_id;

        if (!post_id) return res.status(400).send(msg('Post id not provided.'));

        postModel.findOne({ _id: post_id, user_id: user_id }).lean().then(async response => {
            if (!response) return res.status(404).send(msg('Post not found or not owned by user.'));

            if (response.GPTResponses.length >= 4)
                return res.status(403).send(msg('GPT answers limit exceeded.'));

            try {
                const gptResponse = await openai.chat.completions.create({
                    messages: [
                        { role: 'system', content: process.env.OPENAI_API_BEHAVIOR },
                        { role: 'user', content: response.description + process.env.MODIFIER }
                    ],
                    model: process.env.MODEL
                });
                
                const content = {
                    post_id: post_id,
                    contents: gptResponse.choices[0].message.content
                };
    
                // Create new response
                const entry = await GPTModel.create(content);

                // Bind response to post
                const insertOnPost = await postModel.findByIdAndUpdate(
                    post_id,
                    { 
                        $push: { GPTResponses: entry._id }
                    }
                );

                return res.status(201).send(entry);
            } catch (error) {
                res.status(503).send(msg('OpenAI service unavailable.', error))
            }
        }).catch(e => res.status(400).send(msg('Invalid post ID.', e)));
    }
};
