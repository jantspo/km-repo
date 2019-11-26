import fetch from 'isomorphic-fetch';
const dev = process.env.NODE_ENV !== 'production';
import getConfig from 'next/config'
// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.
const { publicRuntimeConfig } = getConfig()

// console.log(serverRuntimeConfig.mySecret) // Will only be available on the server side
console.log(publicRuntimeConfig)

const server = publicRuntimeConfig.SERVER_URL;
console.log(server);
// export default async function http(url, data, method){
//     try{
//         const reqMethod = method || 'GET';
//         // return fetch(`${server}/${url}`, {
//         const res = await fetch(`/${url}`, {
//             method: reqMethod,
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             mode: 'cors',
//             cache: 'no-cache',
//             credentials: 'same-origin',
//             redirect: 'follow',
//             referrer: 'no-referrer',
//             body: data ? JSON.stringify(data) : null
//         });
        
//         if(!res.ok) return Error('Server error');
//         return res;
//     }catch(err) {
//         return err;
//     }
// }

const options = {
    headers: {
        "Content-Type": "application/json"
    },
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrer: 'no-referrer',
};

const send = (url, method, data) => {
    debugger;
    return new Promise((resolve, reject) => {
        fetch(`${server}${url}`, {...options, method: method, body: data ? JSON.stringify(data) : null})
            .then(response => {
                debugger;
                return response.ok ? 
                       resolve(response) : 
                       reject(response)
            });
    })
}

const http = {

    get: async (url) => {
        debugger;
        return send(`/${url}`, 'GET');
    },
    post: (url, data) => {
        return send(`/${url}`, 'POST', data);
    },
    put: async (url, data) => {
        return send(`/${url}`, 'PUT', data);
    },
    del: async (url) => {
        return send(`/${url}`, 'DELETE')
    },
}

export default http;