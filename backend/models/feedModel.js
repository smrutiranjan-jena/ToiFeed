const mongoose = require('mongoose')
const Schema = mongoose.Schema
const feedSchema = new Schema({
    "topstoriesFeed": {
        type: Object,
        required: true
    },
    "mostrecentFeed": {
        type: Object,
        required: true
    },
    "indiaFeed": {
        type: Object,
        required: true
    },
    "worldFeed": {
        type: Object,
        required: true
    },
    "NRIFeed": {
        type: Object,
        required: true
    },
    "businessFeed": {
        type: Object,
        required: true
    }

}, { timestamps: true })
const Feed = mongoose.model('Feed', feedSchema)
module.exports = Feed