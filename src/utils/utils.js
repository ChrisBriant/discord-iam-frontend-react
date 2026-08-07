function hasExpired(dateString) {
    return new Date(dateString) < new Date();
}

export {hasExpired};