/**
 * Load all entries for a specific roommate from the database
 * Depends on res.locals.roommate
 * The result is saved to res.locals.entries
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        const roommate = res.locals.roommate;
        if (!roommate) {
            return res.status(400).end();
        }
        res.locals.entries = objRepo.db.entries.findByIds(roommate.entryIds);
        next();
    };
};