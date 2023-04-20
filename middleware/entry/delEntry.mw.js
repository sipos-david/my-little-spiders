/**
 * Removes an entry from the database, the entity used here is: res.locals.entry
 * Depends on res.locals.roommate
 * Redirects to /roommate/:roommateId after delete
 */
module.exports = function (objRepo) {
    return function (req, res, _) {
        const roommate = res.locals.roommate;
        const entryId = parseInt(req.params.entryId);
        if (!roommate || isNaN(entryId)) {
            return res.status(400).end();
        }

        const entry = objRepo.db.entries.findById(entryId);
        if (entry) {
            const removedIdx = roommate.entryIds.findIndex( e => e === entry.id);
            if (removedIdx > -1) {
                roommate.entryIds.splice(removedIdx, 1);
                objRepo.db.roommates.update(roommate);
                objRepo.db.entries.deleteById(entryId);
            }
        }

        res.redirect(`/roommate/${roommate.id}`);
    };
};