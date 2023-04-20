/**
 * Using the template engine render the given view
 *
 * Passes req.locals.renderParams to the given view as parameters
 */
module.exports = function (objRepo, viewName) {
    return function (req, res, _) {
        console.log('render: ' + viewName);
        res.render(viewName, res.locals);
    };
};