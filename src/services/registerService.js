import axios from "axios";

const baseURL="http://localhost:3000";
const subUrl=`${baseURL}/registercrud`;
const regUrl= `${subUrl}/register`;
const getUrl =`${subUrl}/get/register`

export const registerPostdata = async(firstname,lastname,password,confirmpassword,email,phno) => {
    try{
        console.log(regUrl,'post....');
        let response = axios.post(regUrl,{
            firstname: firstname,
            lastname: lastname,
            password: password,
            confirmpassword: confirmpassword,
            email: email,
            phno: phno
        });
        return response;
    }catch(error){
        console.log(error);
    }
}

export const registerGetdata = async(firstname) => {
    try{
        let response = await axios.post(getUrl,{
            firstname: firstname
        });
        console.log("dddd",response);
        return response;
    }catch(error){
        console.log(error);
        if(error?.response?.data === "FirstName already taken"){
            return error?.response;
        }
    }
}