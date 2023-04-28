
const db = require('../config/db');

const Roommate = db.model('Roommate', {
    name: String,
    location: String,
    numOfNightmares: {
        type: Number,
        min: 0,
        default: 0
    }
});

module.exports = Roommate;