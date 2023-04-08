/**
 * Removes a roommate from the database, the entity used here is: res.locals.roommate
 * Ends the middleware chain
 * Redirects to / after delete
 */
module.exports = function (objRepo) {
    return function (req, res, _) {
        const roommate = res.locals.roommate;
        if (!roommate) {
            return res.status(400).end();
        }

        const deleted = objRepo.db.roommates.deleteById(roommate.id);
        if (!deleted) {
            return res.status(404).end();
        }

        if (deleted.entryIds && Array.isArray(deleted.entryIds)) {
            for (const entry in deleted.entryIds) {
                objRepo.db.entries.deleteById(entry.id);
            }
        }
        res.redirect("/");
    };
};