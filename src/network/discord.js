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