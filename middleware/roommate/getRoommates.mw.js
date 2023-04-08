/**
 * Load all roommates from the database
 * The result is saved to res.locals.roommates
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        res.locals.roommates = objRepo.db.roommates.findAll();
        next();
    };
};