const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Entry = db.model('Entry', {
    date: {
        type: Date,
        default: () => Date.now()
    },
    text: String,
    respectGained: {
        type: Number,
        min: 0,
        default: 0
    },
    _roommate: {
        type: Schema.Types.ObjectId,
        ref: 'Roommate'
    }
});

module.exports = Entry;