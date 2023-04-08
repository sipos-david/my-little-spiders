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
const db = require("../lib/db")

module.exports = function (app) {
    const objRepo = {db: {roommates: db(), entries: db()}};

    // View roommates
    app.get('/',
        getRoommatesMW(objRepo),
        renderMW(objRepo, 'index'));

    // Add new roommate
    app.get('/roommate/new',
        renderMW(objRepo, 'roommateNew'));
    app.post('/roommate',
        saveRoommateMW(objRepo));

    // Edit roommate
    app.get('/roommate/:roommateId/edit',
        renderMW(objRepo, 'roommateEdit'));
    app.put('/roommate/:roommateId',
        getRoommateMW(objRepo),
        saveRoommateMW(objRepo));
    app.delete('/roommate/:roommateId',
        getRoommateMW(objRepo),
        delRoommateMW(objRepo));

    // View roommate details
    app.get('/roommate/:roommateId',
        getRoommateMW(objRepo),
        getEntriesMW(objRepo),
        renderMW(objRepo, 'roommateDetails'));

    // Add new entry to roommate
    app.get('/roommate/:roommateId/entries/new',
        renderMW(objRepo, 'entryNew'))
    app.post('/roommate/:roommateId/entries',
        getRoommateMW(objRepo),
        saveEntryMW(objRepo));

    // Edit roommate entries
    app.get('/roommate/:roommateId/entries/edit',
        renderMW(objRepo, 'entryEdit'))
    app.put('/roommate/:roommateId/entries/:entryId',
        getRoommateMW(objRepo),
        getEntryMW(objRepo),
        saveEntryMW(objRepo));
    app.delete('/roommate/:roommateId/entries/:entryId',
        getRoommateMW(objRepo),
        getEntryMW(objRepo),
        delEntryMW(objRepo));
};