const Feed = require('../models/feedModel')
const feedCltr = {}
feedCltr.getTopStoriesFeed = async (req, res) => {
    try {
        const response = await Feed.find()
        res.json(response[0].topstoriesFeed)
    } catch (err) {
        res.json(err)
    }
}
feedCltr.getMostRecentFeeds = async (req, res) => {
    try {
        const response = await Feed.find()
        res.json(response[0].mostrecentFeed)
    } catch (err) {
        res.json(err)
    }
}
feedCltr.getIndiaFeeds = async (req, res) => {
    try {
        const response = await Feed.find()
        res.json(response[0].indiaFeed)
    } catch (err) {
        res.json(err)
    }
}
feedCltr.getWorldFeeds = async (req, res) => {
    try {
        const response = await Feed.find()
        res.json(response[0].worldFeed)
    } catch (err) {
        res.json(err)
    }
}
feedCltr.getNriFeeds = async (req, res) => {
    try {
        const response = await Feed.find()
        res.json(response[0].NRIFeed)
    } catch (err) {
        res.json(err)
    }
}
feedCltr.getBusinessFeeds = async (req, res) => {
    try {
        const response = await Feed.find()
        res.json(response[0].businessFeed)
    } catch (err) {
        res.json(err)
    }
}
module.exports = feedCltr