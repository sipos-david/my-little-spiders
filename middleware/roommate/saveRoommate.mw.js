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
    return function (req, res, next) {
        // Request is malformed
        const body = parseRoommate(req.body)
        if ((!body && !res.locals.roommate) ||
            (!body && res.locals.roommate)) {
            return res.status(400).end();
        }

        // Add new item
        if (body && !res.locals.roommate) {
            const added = new objRepo.db.Roommate(body);
            return added.save(function (err) {
                if (err) {
                    return next(err);
                }
                return res.status(201).redirect(`/roommate/${added._id}`);
            });
        }

        // Handle existing item change
        return objRepo.db.Roommate.updateOne({ _id: res.locals.roommate._id }, body, function (err) {
            if (err) {
                return next(err);
            }
            return res.status(200).redirect(`/roommate/${res.locals.roommate._id}`);
        })
    };
};