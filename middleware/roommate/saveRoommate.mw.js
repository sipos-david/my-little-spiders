const parseIntParam = require("../../lib/parseIntParam");

function parseRoommate(body) {
    if (!('name' in body) || typeof body.name !== 'string') {
        return undefined;
    }
    if (!('location' in body) || typeof body.location !== 'string') {
        return undefined;
    }
    const numOfNightmares = 'numOfNightmares' in body ? parseIntParam(body.numOfNightmares) : 0;

    return {name: body.name, location: body.location, numOfNightmares: numOfNightmares, entryIds: []};
}

/**
 * Using POST params update or save a roommate to the database
 * If res.locals.roommate is there, it's an update otherwise this middleware creates an entity
 * Redirects to /roommate/:roommateId after success
 */
module.exports = function (objRepo) {
    return function (req, res, _) {
        // Request is malformed
        const bodyParsed = parseRoommate(req.body)
        if ((!bodyParsed && !res.locals.roommate) ||
            (!bodyParsed && res.locals.roommate)) {
            return res.status(400).end();
        }

        // Add new item
        if (bodyParsed && !res.locals.roommate) {
            const added = objRepo.db.roommates.add(bodyParsed);
            return res.status(201).redirect(`/roommate/${added.id}`);
        }

        // Handle existing item change
        const updated = objRepo.db.roommates.update({
            ...bodyParsed,
            entryIds: res.locals.roommate.entryIds,
            id: res.locals.roommate.id,
        });
        return res.status(200).redirect(`/roommate/${updated.id}`);
    };
};