function parseEntry(body) {
    const date = body.date;
    if (!date || typeof date !== 'string') {
        return undefined;
    }
    const text = body.text;
    if (!text || typeof text !== 'string') {
        return undefined;
    }
    const respectGained = body.respectGained;
    if (!respectGained && respectGained === 'number') {
        return undefined;
    }

    return {date: date, text: text, respectGained: respectGained};
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
            !bodyParsed && res.locals.entry) {
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
        const updated = objRepo.db.entries.update({
            ...bodyParsed,
            id: res.locals.entry.id,
        });
        return res.status(200).redirect(`/roommate/${updated.id}`);
    };
};