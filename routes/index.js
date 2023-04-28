const renderMW = require('../middleware/render.mw');
// Roommate middlewares
const getRoommatesMW = require('../middleware/roommate/getRoommates.mw');
const getRoommateMW = require('../middleware/roommate/getRoomate.mw');
const saveRoommateMW = require('../middleware/roommate/saveRoommate.mw');
const delRoommateMW = require('../middleware/roommate/delRoommate.mw');
// Entry middlewares
const getEntriesMW = require('../middleware/entry/getEntries.mw');
const getEntryMW = require('../middleware/entry/getEntry.mw');
const saveEntryMW = require('../middleware/entry/saveEntry.mw');
const delEntryMW = require('../middleware/entry/delEntry.mw');
// Our trusty makeshift db
const Roommate = require("../models/roommate")
const Entry = require("../models/entry")

module.exports = function (app) {
    const objRepo = {db: {Roommate, Entry}};

    // Edit roommate entries
    app.get('/roommate/:roommateId/entries/:entryId/delete',
        getRoommateMW(objRepo),
        delEntryMW(objRepo));
    app.post('/roommate/:roommateId/entries/:entryId/edit',
        getRoommateMW(objRepo),
        getEntryMW(objRepo),
        saveEntryMW(objRepo));
    app.get('/roommate/:roommateId/entries/:entryId/edit',
        getRoommateMW(objRepo),
        getEntryMW(objRepo),
        renderMW(objRepo, 'edit-entry'))

    // Add new entry to roommate
    app.get('/roommate/:roommateId/entries/new',
        getRoommateMW(objRepo),
        renderMW(objRepo, 'add-entry'))
    app.post('/roommate/:roommateId/entries',
        getRoommateMW(objRepo),
        saveEntryMW(objRepo));

    // Edit roommate
    app.get('/roommate/:roommateId/delete',
        getRoommateMW(objRepo),
        delRoommateMW(objRepo));
    app.post('/roommate/:roommateId/edit',
        getRoommateMW(objRepo),
        saveRoommateMW(objRepo));
    app.get('/roommate/:roommateId/edit',
        getRoommateMW(objRepo),
        renderMW(objRepo, 'edit-friend'));

    // Add new roommate
    app.get('/roommate/new',
        renderMW(objRepo, 'add-friend'));
    app.post('/roommate',
        saveRoommateMW(objRepo));

    // View roommate details
    app.get('/roommate/:roommateId',
        getRoommateMW(objRepo),
        getEntriesMW(objRepo),
        renderMW(objRepo, 'view-friend'));

    // View roommates
    app.get('/',
        getRoommatesMW(objRepo),
        renderMW(objRepo, 'index'));
};