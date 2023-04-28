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
        return objRepo.db.Entry.find({_roommate: roommate._id}, function (err, entries) {
            if (err) {
                return next(err);
            }
            res.locals.entries = entries;
            return next();
        });
    };
};