module.exports = function emptyStringsToNull (object) {
    for (var key in object) {
        if(object.hasOwnProperty(key))
        if (object[key] === '') {
            object[key] = null;
        }
    }

    return object;
};