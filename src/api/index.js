import axios from './config'

export default {

    userlogout(sid) {
        return axios.get('/api/user/login?sid=' + sid);
    },
    requestride(sid) {
        return axios.post('/api/user/requestride', {
            sid: sid
        })
    },
    getmessages () {
        return axios.get('/hello');
    },
    login (payload) {
        return axios.post('/api/addUser', {
            name: payload
        })
    },
    getclient (sid) {
        return axios.get('/api/getClient?sid=' + sid);
    }

}