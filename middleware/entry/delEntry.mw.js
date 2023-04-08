/**
 * Removes an entry from the database, the entity used here is: res.locals.entry
 * Depends on res.locals.roommate
 * Redirects to /roommate/:roommateId after delete
 */
module.exports = function (objRepo) {
    return function (req, res, _) {
        const roommate = res.locals.roommate;
        if (!roommate) {
            return res.status(400).end();
        }
        let statusCode = 400;
        const entry = objRepo.db.findById(req.params.entryId);
        if (entry) {
            statusCode = 200;

        }

        res.status(statusCode).redirect(`roommate/${roommate.id}`);
    };
};