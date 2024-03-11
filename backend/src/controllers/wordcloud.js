// controllers/feedbackController.js
const Feedback = require('../models');
const { fetchTeamReviews } = require('../services/wordcloud');
const stopWords = ['the', 'a', 'and', 'to', 'is', 'it', 'that', 'of', 'in', 'I', 'you', 'for', 'with', 'on', 'was', 'are', 'as', 'this', 'but', 'have', 'be', 'at', 'or', 'not', 'your', 'we', 'they', 'my', 'from', 'by', 'will', 'can', 'all', 'an', 'there', 'which', 'if', 'so', 'has', 'more', 'when', 'what', 'about', 'one', 'their', 'some', 'would', 'like', 'up', 'out', 'just', 'get', 'me', 'no', 'into', 'do', 'our', 'who', 'he', 'them', 'time', 'its', 'only', 'could', 'new', 'other', 'how', 'than', 'also', 'people', 'any', 'first', 'then', 'now', 'may', 'been', 'make', 'over', 'down', 'way', 'because', 'us', 'very', 'where', 'even', 'back', 'well', 'work', 'through', 'being', 'long', 'much', 'go', 'come'];

exports.getFeedbackWords = async (req, res) => {
    const { teamId } = req.body;
    try {
        const feedbacks = await fetchTeamReviews(teamId);

        const wordCounts = {};

        feedbacks.forEach(feedback => {
            const words = feedback.review.split(/\s+/);
            words.forEach(word => {
                word = word.toLowerCase();
                if (!stopWords.includes(word)) {
                    wordCounts[word] = (wordCounts[word] || 0) + 1;
                }
            });
        });

        const myWords = Object.entries(wordCounts).map(([word, size]) => ({ word, size }));
        res.json(myWords);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching feedback words", error: error.message });
    }
};