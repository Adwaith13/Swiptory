import axios from 'axios'

export const registerUser = async(userData)=>{
    const URL = import.meta.env.VITE_BACKEND_URL
    try{
        const userResponse = await axios.post(`${URL}/register`,userData)
        if(!userResponse){
            throw new Error('Registration Failed');
        }
        return userResponse.data
    }catch(err){
        console.log(err)
    }

}