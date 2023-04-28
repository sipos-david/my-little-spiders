/**
 * Loads a roommate from the database using the :roommateId param
 * The result is saved to res.locals.roommate
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        return objRepo.db.Roommate.findById(req.params.roommateId, function (err, roommate) {
            if (err) {
                return next(err);
            }
            res.locals.roommate = roommate;
            return next();
        });
    };
};