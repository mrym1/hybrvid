import axios from "axios";

export const _api = "https://api.hybrvid.com/";

export const post_api = async (url, body) => {
  try {
    const response = await axios({
      method: "post",
      url: _api + url,
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data: body,
    });
    // console.log(response, "Response"); 
    // Process the response and return the desired result

    if (response.data.status === "failed") {
      // alert(response.data);
      return null;
    } else {
      return response.data;
    }
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      // Handle network error
      console.error(
        "Network error occurred. Please check your internet connection."
      );
    } else {
      // Handle other types of errors
      console.error("An error occurred:", error.message);
    }
    console.log(error);
    // alert(error.response.data.message);
    return null;
  }
};

export const get_api  = async(url,params='') => {
    var res;
    await axios({
            method: 'get',
            url: _api+url+params,
    }).then((data)=>{
        if(data.data.status==='failed'){
          console.log(data.data.message, "Video Data");
            res=  null;
        }else{
            res= data.data;
            console.log("else" , res);
        }
    }).catch((error)=>{
        console.log(error.response.data.message);
        res=null;
    });
    return res;

}

// export const delete_api  = async(url,params='') => {
//     const token =  localStorage.getItem('token')
//     var res;
//     await axios({
//             method: 'delete',
//             url: _api+url+params,
//             headers: { Authorization: `Bearer ${token}` },
//     }).then((data)=>{
//         if(data.data.result.status==='fail'){
//             alert(data.data.result.message);
//             res=  null;
//         }else{
//             res= data.data.result;
//         }
//     }).catch((error)=>{
//         console.log(error.response.data);
//         alert(error.response.data.message);
//         res=null;
//     });
//     return res;

// }
