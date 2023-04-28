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
    let entry = {
        text: body.text,
        respectGained: parseIntParam(body.respectGained)
    }
    if (body.date !== "") {
        entry.date =  body.date;
    }
    return entry;
}

/**
 * Using POST params update or save an entry for a specific roommate to the database
 * Depends on res.locals.roommate
 * If res.locals.entry is there, it's an update otherwise this middleware creates an entity
 * Redirects to /roommate/:roommateId after success
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        // Request is malformed
        if (!res.locals.roommate) {
            res.status(400).end();
        }
        const body = parseEntry(req.body)
        if ((!body && !res.locals.entry) ||
            (!body && res.locals.entry)) {
            res.status(400).end();
        }

        // Add new item
        if (body && !res.locals.entry) {
            const added = new objRepo.db.Entry({...body, _roommate: res.locals.roommate._id});
            return added.save(function (err) {
                if (err) {
                    return next(err);
                }
                return res.status(201).redirect(`/roommate/${res.locals.roommate._id}`);
            });
        }

        // Handle existing item change
        return objRepo.db.Entry.updateOne({_id: res.locals.entry._id}, body, function (err) {
            if (err) {
                return next(err);
            }
            return res.status(200).redirect(`/roommate/${res.locals.roommate._id}`);
        })
    };
};