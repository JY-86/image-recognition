function parse(url) {
    if (!url) return undefined;
    
    let data = {};
    // extract name
    // improve to regex later
    let indexes = {
        doubleSlash: url.indexOf("//"),
        colon: url.lastIndexOf(":"),
        ampersand: url.indexOf("@"),
        slash: url.lastIndexOf("/"),
        qMark: url.indexOf("?")
    }
    data.username = url.slice(indexes.doubleSlash + 2, indexes.colon);
    data.password = url.slice(indexes.colon + 1, indexes.ampersand);
    data.host = url.slice(indexes.ampersand + 1, indexes.slash);
    data.databaseName = url.slice(indexes.slash + 1, indexes.qMark);

    return data;
}

module.exports = {
    parse
}