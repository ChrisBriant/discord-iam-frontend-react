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


function getUsers() {
    return new Promise( async (resolve,reject) => {
        const url = `/authorisation/users?page_size=3`;

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


function getPagedDataAsList(url) {
    return new Promise( async (resolve,reject) => {
        let itemsList = [];
        conn.get(url)
        .then( async (response) => {
            console.log("NEXT PAGE", response.data.next_page);
            let nextPage = response.data.next_page;
            itemsList = response.data.data;
            while(nextPage) {
                // conn.get(response.data.next_page).then(nextRes => {
                //     itemsList = [...itemsList,response.data.data];
                // }).catch(err => {
                //     console.error("ERROR REJECT",err);
                //     return reject(err);
                // }); 
                try {
                    const nextRes = await conn.get(nextPage)
                    nextPage = nextRes.next_page;
                    itemsList = [...itemsList,...nextRes.data.data];
                } catch(err) {
                    console.error("ERROR REJECT",err);
                    return reject(err);
                }; 
            }
            return resolve(itemsList);
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
    getUsers,
    goToPage,
    getPagedDataAsList,
};