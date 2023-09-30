import axios from "axios";

const baseURL = "http://localhost:3000"
const subUrl = `${baseURL}/logincrud`
const postUrl = `${subUrl}/users`

export const getData = async(username,password) => {
    try{
        let response = await axios.post(postUrl,{
                username,
                password,
        });
        return response;
    }catch(error) {
        console.log(error);
        if(error?.response?.data)
        return error?.response?.data;
    }
}
