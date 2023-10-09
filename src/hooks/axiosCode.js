import axios from "axios";
import { BASE_URL } from "./routes";
 

const Axios_Fetch=async(Route)=>{
  
  


 return new Promise((resolve)=>{
    axios({
        method: 'get',
        // url:'http://localhost:7239/api/user/getusers',
          url: `${BASE_URL}${Route}`,
      }).then((response) => {
      
        resolve( response.data);
      }).catch(error=>{
        console.log('errrr',error);
      })
 })
   
}

const Axios_Post_data=(obj,url)=>{
    
  return new Promise((resolve)=>{

    axios({
      method: 'post',
      url: `${BASE_URL}${url}`,
      data: obj,
      headers:{
        "Authorization": "Bearer"+ global?.userData?.token,
      }
    }).then((Response)=>{
     if(Response.status==200)
     {
      resolve(Response.data)
     }
     else{
           console.log('check net connection');
     }
    });

  })

  

}
export {Axios_Fetch,Axios_Post_data};