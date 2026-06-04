import axios from 'axios';


export async function register({username,email,password}){
    try{

        const response =await axios.post('https:localhost:3000/api/auth/register',{
            username,email,password
        } , {
            withCredentials:true //this line is because axios does not access tokens/cookies by default 
        })
        return response.data;
    } catch(err){
        console.log(err);
    }
}

export async function login({email,password}) {
    try{

        const response =await axios.post('https:localhost:3000/api/auth/login',{
            email,password
        },{
        withCredentials:true
        });
        return response.data;
    }catch(err){
        console.log(err)
    }
}

export async function logout() {
    try{
        const response = await axios.get("https:localhost:3000/api/auth/logout",{
            withCredentials:true
        });
        return response.data;

    }catch(err){
        console.log(err)
    }
}

export async function getMe() {
    try{
        const response = await axios.get("https:localhost:3000/api/auth/get-me",{
            withCredentials:true
        })
        return response.data;
    }catch(err){
        console.log(err);
    }

}