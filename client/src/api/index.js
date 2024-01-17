import axios from 'axios';

const url='http://localhost:5000';
export const fetchSecrets=()=> axios.get(`${url}/messages`);
const token=JSON.parse(localStorage.getItem('profile'))?.token;
const config={
    headers:{Authorization:`Bearer ${token}`}
}

export const createPost=(newPost)=>axios.post(`${url}/messages/create`,newPost,config);
// export const updatePost=(id,updatedPost)=>axios.patch(`${url}/${id}`,updatedPost,{},config);

export const jwtsignin=(signindata)=>axios.post(`${url}/users/signin`,signindata);
export const jwtsignup=(signupdata)=>axios.post(`${url}/users/signup`,signupdata);
export const resetpassword=(data)=>axios.post(`${url}/password-reset/request`,{email:data});

