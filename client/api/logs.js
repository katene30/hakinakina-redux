import request from 'superagent'

export function getLogs(){
    return request.get('/api/v1/logs')
    .then(res => res.body)
}

export function getLogsByOwner(owner){
    return request.get(`/api/v1/logs/${owner}`)
    .then(res => res.body)
}

export function signOut(id){
    return request.post(`api/v1/log/${id}`)
    .then(res => res.body)
}

export function addLog(log){
    return request.post('api/v1/log')
    .send(log)
    .then(res => res.body)
}

export function timeOut(logs){
    return request.post('api/v1/time-out')
    .send(logs)
    .then(res => res.body)
}