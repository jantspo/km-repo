import fetch from 'isomorphic-fetch';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig();
const server = publicRuntimeConfig.SERVER_URL;

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
    return new Promise((resolve, reject) => {
        fetch(`${server ? server : ''}${url}`, {...options, method: method, body: data ? JSON.stringify(data) : null})
            .then(response => {
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