const parseIntParam = require("../../lib/parseIntParam");

function parseEntry(body) {
    if (!('date' in body) || typeof body.date !== 'string') {
        return undefined;
    }
    if (!('text' in body) || typeof body.text !== 'string') {
        return undefined;
    }
    if (!('respectGained' in body)) {
        return undefined;
    }

    return {date: body.date, text: body.text, respectGained: parseIntParam(body.respectGained)};
}

/**
 * Using POST params update or save an entry for a specific roommate to the database
 * Depends on res.locals.roommate
 * If res.locals.entry is there, it's an update otherwise this middleware creates an entity
 * Redirects to /roommate/:roommateId after success
 */
module.exports = function (objRepo) {
    return function (req, res, _) {
        // Request is malformed
        if (!res.locals.roommate) {
            res.status(400).end();
        }
        const bodyParsed = parseEntry(req.body)
        if ((!bodyParsed && !res.locals.entry) ||
            (!bodyParsed && res.locals.entry)) {
            res.status(400).end();
        }

        // Add new item
        if (bodyParsed && !res.locals.entry) {
            const added = objRepo.db.entries.add(bodyParsed);
            res.locals.roommate.entryIds.push(added.id);
            objRepo.db.roommates.update(res.locals.roommate);
            return res.status(201).redirect(`/roommate/${res.locals.roommate.id}`);
        }

        // Handle existing item change
        objRepo.db.entries.update({
            ...bodyParsed,
            id: res.locals.entry.id,
        });
        return res.status(200).redirect(`/roommate/${res.locals.roommate.id}`);
    };
};