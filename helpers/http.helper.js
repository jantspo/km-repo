import fetch from 'isomorphic-fetch';
import getConfig from 'next/config'
// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.
const { publicRuntimeConfig } = getConfig()

// console.log(serverRuntimeConfig.mySecret) // Will only be available on the server side
console.log(publicRuntimeConfig)

const server = publicRuntimeConfig.SERVER_URL;
console.log(server)
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
    console.log(url, server);
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