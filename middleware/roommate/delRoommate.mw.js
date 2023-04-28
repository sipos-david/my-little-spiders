/**
 * Removes a roommate from the database, the entity used here is: res.locals.roommate
 * Ends the middleware chain
 * Redirects to / after delete
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        const roommate = res.locals.roommate;
        if (!roommate) {
            return res.status(400).end();
        }

        return objRepo.db.Roommate.deleteOne({ _id: roommate._id },function (err, result) {
            if (err) {
                return next(err);
            }
            if (result.deletedCount !== 1) {
                return res.status(404).end();
            }
            return objRepo.db.Entry.deleteMany({_roommate: roommate._id}, function (error) {
                if (error) {
                    return next(error);
                }
                return res.redirect("/");
            });
        });
    };
};