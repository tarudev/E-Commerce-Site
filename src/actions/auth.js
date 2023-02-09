import axios from "axios";

export const signUp=(details,callback)=>{
    return async(dispatch)=>{
        try{
            const response=await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBE3u7vX5Wq4XhQuYjPIhs5_mGjubLg74k',
                {
                    email:details.email,
                    password:details.password,
                    returnSecureToken:true
                }

            )
            console.log(response)
            dispatch({
                type:'SIGNUP',
                payload:response.data
            })
            localStorage.setItem("token",response.data.idToken)
            callback(response.data);
        }
        catch(error){
            console.log(error.response)
        }
    }
} 

export const logIn=(details,callback)=>{
    return async(dispatch)=>{
        try{
            const response=await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBE3u7vX5Wq4XhQuYjPIhs5_mGjubLg74k',
                {
                    email:details.email,
                    password:details.password,
                    returnSecureToken:true
                }
            )
            localStorage.setItem("token",response.data.idToken)
            console.log(response)
            dispatch({
                type:'LOGIN',
                payload:response.data
            })
            callback(response);
        }
        catch(error){
            console.log(error.response)
        }
    }
} 

export const checkLogin=()=>{
    return async(dispatch)=>{
        try{
            let token=localStorage.getItem("token")
            if(!token)return;
            const response=await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBE3u7vX5Wq4XhQuYjPIhs5_mGjubLg74k',
                {
                    idToken:token
                }
            )
            console.log(response)
            dispatch({
                type:'CHECKLOG',
                payload:{
                    idToken:token,
                    localId:response.data.users[0].localId,
                    ...response.data
                }
            })
            // callback(response);
        }
        catch(error){
            console.log(error.response)
        }
    }
}

export const logOut=()=>{
    return dispatch=>{
        localStorage.removeItem("token")
        dispatch({
            type:"LOGOUT"
        })
    }
}