function hasExpired(dateString) {
    return new Date(dateString) < new Date();
}

function formatBritishDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-GB");
}

export {hasExpired, formatBritishDate};