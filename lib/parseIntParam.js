module.exports = function (param, fallback = 0) {
    if (typeof param === 'number') {
        return param;
    }
    if (typeof param === 'string') {
        const parsed = parseInt(param);
        if (!isNaN(parsed)) {
            return parsed;
        }
    }
    return fallback;
}