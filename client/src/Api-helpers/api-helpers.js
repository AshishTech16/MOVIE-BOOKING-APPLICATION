import axios from 'axios'
export const getAllMovie = async () => {
    const res = await axios.get("/movie")
      .catch((err) => console.log(err));

      if(res.status!== 200){
        return console.log("No Data");
      }
      const data = await res.data;
      return data; 
}; 

export const sendUserAuthRequest = async (data, signup) => {
  const res = await axios.post(`/user/${signup ? "signup" : "login"}`, {
     name: signup ? data.name: " ",
     email: data.email,
     password: data.password
  })
  .catch((err)=> console.log(err));
  if(res.status !== 200 && res.status !== 201){
    console.log("unexpected Error Occured");
  }
  const resData = await res.data;
  return resData;
}


export const sendAdminAuthRequest = async (data) => {
  const res = await axios.post("admin/login",{
    email: data.email,
    password: data.password
  }).catch((err) => console.log(err));
  if(res.status !== 200){
    return console.log("Unexprected Error Occured");
  }
  const resData = await res.data;
  return resData;
}
export const getMoviedetails=async(id)=>{
  const res=await axios.get(`/movie/${id}`).catch((err)=>{console.log(err)})
  if(res.status!==200)
  {
   return console.log("unexpected error")
  }
  const resData=await res.data;
  return resData;
};
export const newBooking=async(data)=>{
       const res=await axios.post('/booking',{
           movie:data.movie,
           seatNumber:data.seatNumber,
           date:data.date,
           user:localStorage.getItem("userId")
       })
       
       .catch((err)=>{console.log(err)});
       console.log(data,localStorage.getItem("userId"));
       if(res.status!==201)
       {
           return console.log("unexpected error")
       }
       const resdata=await res.data;
       return resdata;
}
export const getUserBooking=async()=>{
   const id=localStorage.getItem("userId");
   console.log(id);
   const res=await axios.get(`/user/booking/${id}`).catch((err)=>{
       console.log(err);
   })
       if(res.status!==200)
       {
           console.log("unexpected error");
       }
       const resData= await res.data;
       return resData;
  
}
export const deleteBooking=async(id)=>{

   const res=await axios.delete(`/booking/${id}`).catch((err)=>{
       console.log(err);
   })
   if(res.status!==200)
   {
       console.log("unexpected error");
   }
   const resData= await res.data;
   return resData;
   
}
export const getUserDetails =async()=>{
   const id = localStorage.getItem("userId");

   const res = await axios.get(`/user/${id}`)
   .catch((err) => console.log(err));
   
   if (res.status !== 200) { 
    return console.log("unexpected Error");   
   }
   const respData = await res.data;
   console.log(respData);
   return respData;
}
export const addMovie=async(data)=>{
   const res=await axios.post('/movie',{
       title:data.title,
       description:data.description,
       releaseDate:data.releaseDate,
       posterUrl:data.posterUrl,
       actors:data.actors,
       admin:localStorage.getItem('adminId'),


   },{
       headers:{
           Authorization: `Bearer ${localStorage.getItem("token")}`
       }
   }).catch((err)=>console.log(err))
   if (res.status !== 201) {
               return console.log("Unexpected Error");
           }
           const resData = await res.data;
           return resData;

}

export const getAdminById = async () => {
   const adminId = localStorage.getItem("adminId");
   const res = await axios
       .get(`/admin/${adminId}`)
       .catch(err => console.log(err));
   
   
   if (res.status !== 200) { 
       return console.log("Unexpected Error");
   }
   const resData = await res.data;
   return resData;
   
}