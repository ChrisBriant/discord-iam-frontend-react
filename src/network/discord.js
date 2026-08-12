import { conn } from "../network/network";

function getChannels() {
    return new Promise( async (resolve,reject) => {
        const url = "/discord/channels";

        conn.get(url)
        .then( (response) => {
            return resolve(response.data);
        }).catch((err) => {
            console.error("ERROR REJECT",err);
            return reject(err);
        });
    });
} 


function getFeed(channelId) {
    return new Promise( async (resolve,reject) => {
        const url = `/discord/channels/messages/${channelId}`;

        conn.get(url)
        .then( (response) => {
            return resolve(response.data);
        }).catch((err) => {
            console.error("ERROR REJECT",err);
            return reject(err);
        });
    });
} 

function getEvents() {
    return new Promise( async (resolve,reject) => {
        const url = `/discord/events`;

        conn.get(url)
        .then( (response) => {
            return resolve(response.data);
        }).catch((err) => {
            console.error("ERROR REJECT",err);
            return reject(err);
        });
    });
} 

function getRoles() {
    return new Promise( async (resolve,reject) => {
        const url = `/authorisation/roles`;

        conn.get(url)
        .then( (response) => {
            return resolve(response.data);
        }).catch((err) => {
            console.error("ERROR REJECT",err);
            return reject(err);
        });
    });
} 

function activateRole(roleId) {
    return new Promise( async (resolve,reject) => {
        const url = `/authorisation/${roleId}/activaterole`;
        conn.put(url)
            .then( (response) => {
                return resolve(response.data);
            }).catch((err) => {
                console.error("ERROR REJECT",err);
                return reject(err);
            });
        });
}

function deactivateRole(roleId) {
    return new Promise(async (resolve,reject) => {
        const url = `/authorisation/${roleId}/deactivaterole`;
        conn.delete(url)
            .then( (response) => {
                return resolve(response.data);
            }).catch((err) => {
                console.error("ERROR REJECT",err);
                return reject(err);
            });
        });
}


//Goes to the page where there is a paginated response
//objectType : The type of paginated object, e.g. roles, users. etc.
function goToPage(objectType, page, pageSize=10) {
    return new Promise(async (resolve,reject) => {
        const url = `/authorisation/${objectType}?page=${page}&page_size=${pageSize}`;
        conn.get(url)
            .then( (response) => {
                return resolve(response.data);
            }).catch((err) => {
                console.error("ERROR REJECT",err);
                return reject(err);
            });
        });
}


export { 
    getChannels, 
    getFeed, 
    getEvents, 
    activateRole, 
    deactivateRole, 
    getRoles, 
    goToPage
};