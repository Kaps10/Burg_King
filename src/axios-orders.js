import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burg-king.firebaseio.com/'
});

export default instance;