/**
 * Removes an entry from the database, the entity used here is: res.locals.entry
 * Depends on res.locals.roommate
 * Redirects to /roommate/:roommateId after delete
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        const roommate = res.locals.roommate;
        if (!roommate) {
            return res.status(400).end();
        }

        return objRepo.db.Entry.deleteOne({_id: req.params.entryId}, function (err, result) {
            if (err) {
                return next(err);
            }
            if (result.deletedCount !== 1) {
                return res.status(404).end();
            }
            return res.redirect(`/roommate/${roommate._id}`);
        });
    };
};