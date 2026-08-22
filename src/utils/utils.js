function hasExpired(dateString) {
    return new Date(dateString) < new Date();
}

function formatBritishDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-GB");
}


function formatDate(date, format = "YYYY-MM-DD HH:mm") {
    if(!date) return null;
    const tokens = {
        YYYY: date.getFullYear(),
        MM: String(date.getMonth() + 1).padStart(2, "0"),
        DD: String(date.getDate()).padStart(2, "0"),
        HH: String(date.getHours()).padStart(2, "0"),
        mm: String(date.getMinutes()).padStart(2, "0"),
        ss: String(date.getSeconds()).padStart(2, "0"),
    };

    return format.replace(
        /YYYY|MM|DD|HH|mm|ss/g,
        (token) => tokens[token]
    );
}

//Replaces an item in the array
function replaceItem(items,newObject) {
    const index = items.findIndex(item => item.id === newObject.id);

    if (index !== -1) {
        items.splice(index, 1, newObject);
    }
}


export {hasExpired, formatBritishDate, formatDate, replaceItem};