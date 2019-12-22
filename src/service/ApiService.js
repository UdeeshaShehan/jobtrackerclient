import axios from 'axios';

const BASE_URL = 'http://localhost:8080'
//const BASE_URL = 'http://ec2-18-140-67-5.ap-southeast-1.compute.amazonaws.com:8080';
const USER_API_BASE_URL = BASE_URL + '/api/auth';

class ApiService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL + '/all');
    }

    fetchUsers(user) {
        return axios.get(USER_API_BASE_URL + '/bycriteria?'+ 'email='+user.email+'&address='+user.address+'&fullname='+
        user.fullname+'&mobileNumber='+user.mobileNumber);
    }

    fetchUserById(userId) {
        return axios.get(USER_API_BASE_URL + '/byid/' + userId);
    }

    deleteUser(userId) {
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }

    addUser(user) {
        return axios.post(""+USER_API_BASE_URL + '/register', user);
    }

    editUser(user) {
        return axios.put(USER_API_BASE_URL + '/updateregitration' , user);
    }

    fetchAllSelfie() {
        return axios.get(BASE_URL + '/placeselfie/all');
    }

    addSelfie(selfie) {
        return axios.post(BASE_URL + '/placeselfie/all', selfie);
    }

    fetchAllSelfie(placeselfie) {
        return axios.get(BASE_URL + '/placeselfie/bycriteria?'+ 
        'jobName='  +placeselfie.jobName +'&email='+ placeselfie.email +'&jobDescription=' + placeselfie.jobDescription);
    }

}

export default new ApiService();
