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
    }
}