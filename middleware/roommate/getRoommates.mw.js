/**
 * Load all roommates from the database
 * The result is saved to res.locals.roommates
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        return objRepo.db.Roommate.find({}, function (err, roommates) {
            if (err) {
                return next(err);
            }
            res.locals.roommates = roommates;
            return next();
        });
    };
};