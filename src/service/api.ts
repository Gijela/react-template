import request from "./request";

interface Payload {}

export const getMsg = (payload?: Payload) => request.get('/getMsg', payload)