/**
 * Loads a roommate from the database using the :roommateId param
 * The result is saved to res.locals.roommate
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        const roommate = objRepo.db.roommates.findById(parseInt(req.params.roommateId));
        if (roommate) {
            res.locals.roommate = roommate;
        }
        next();
    };
};