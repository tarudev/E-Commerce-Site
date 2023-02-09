import axios from "axios";

export const addItemHandler=(item)=>{
    return dispatch=>{
        dispatch({
            type:'ADD_ITEM',
            payload:{
                item:item
            }
        })
    }
}

export const removeItemHandler=id=>{
    return dispatch=>{
        dispatch({
            type:'REMOVE_ITEM',
            payload:{
                id:id
            }
        })
    }
}

export const placeOrder=(callback)=>{
    return async(dispatch,getState)=>{
        try{
            const {cart,auth}=getState();
            if(!auth.idToken){
                return callback({
                    error:true,
                    data:{
                        error:"Please Login to Place order"
                    }
                })
            }else{
            const response=await axios.post(`https://item-base-default-rtdb.firebaseio.com/orders/${auth.localId}.json?auth=${auth.idToken}`,
            {
                ...cart
            })
            dispatch({
                type:'CLEAR_CART'
            })
            return callback({
                error:false,
                data:response.data
            })
        }
        }catch{
            return callback({
                error:true
            })
        }
    }
}