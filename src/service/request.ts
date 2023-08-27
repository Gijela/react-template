import axios from 'axios'

const request = axios.create({
  baseURL: '/api' 
});

// todo: 请求拦截器
// todo: 响应拦截器

export default request