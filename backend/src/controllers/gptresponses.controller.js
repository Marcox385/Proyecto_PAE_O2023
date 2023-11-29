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

// Entity models
const GPTModel = require('./../models/gptresponse');
const postModel = require('./../models/post');

// Load OpenAI Key
dotenv.config();

module.exports = {
    // GET
    getGPTResponses: async (req, res) => {
        const post_id = req.params.post_id || req.query.post_id;

        if (post_id) {
            const post = await postModel.findById(post_id);
            if (!post) return res.status(404).send('Post not found.');

            const responses = [];
            const gptresponse = (await GPTModel.find({ post_id: post_id })).forEach(
                response => responses.push(response.contents)
            );
            return res.status(200).send(responses);
        }

        return res.status(400).send('Post id not provided.');
    },

    // POST
    GPTCall: async (req, res) => {
        const post_id = req.body.post_id;

        if (!post_id) return res.status(400).send('Post id not provided.');

        const { description } = await postModel.findById(post_id, 'description');

        try {
            const openai = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY
            });

            const response = await openai.chat.completions.create({
                messages: [
                    { role: 'system', content: process.env.OPENAI_API_BEHAVIOR },
                    { role: 'user', content: description + process.env.MODIFIER }
                ],
                model: process.env.MODEL,
            });
            
            content = {
                post_id,
                contents: response.choices[0].message.content
            };

            const entry = await GPTModel.create(content);
            return res.status(200).send(entry);
        } catch {
            res.status(503).send('OpenAI service unavailable.')
        }
    }
};
