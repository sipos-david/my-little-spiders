/**
 * Using the template engine render the given view
 *
 * Passes req.locals.renderParams to the given view as parameters
 */
module.exports = function (objRepo, viewName) {
    return function (req, res) {
        console.log('render: ' + viewName);
        switch (viewName) {
            case 'index':
                res.json(res.locals.roommates);
                break;
            case 'roommateDetails':
                res.json({...res.locals.roommate, entries: res.locals.entries});
                break;
        }
        res.end();
    };
};