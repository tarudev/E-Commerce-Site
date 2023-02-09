import { NavLink,useLocation,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import Loader from "../UI/Loader";
import { signUp,logIn } from "../../actions/auth";

const AuthIndex=()=>{

    const [loader,setLoad]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    
    const [details,setDetails]=useState({
        email:"",
        password:""
    })
    const location=useLocation()
    // const params=useParams()
    const type=(location.pathname)

    useEffect(()=>{
        return()=>{
            setLoad(false)
            setDetails({
                email:"",
                password:""
            })
        }
    },[])

    const handleInput=e=>{
        setDetails({
            ...details,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmission=e=>{
        e.preventDefault()
        if(type==='/signup'){
            setLoad(true)
            dispatch(signUp(details,data=>{
                if(data.error){
                    console.log(data.error)
                    alert("ERROR")
                }else{
                    console.log("SUCCESSFULLY SIGNED UP")
                    navigate.replace("/")
                }
                setLoad(false)
            }
            )
            )
        }
        else if(type==='/login'){
            setLoad(true)
            dispatch(logIn(details,(data)=>{
                if(data.error){
                    console.log(data.response)
                    alert("ERROR")
                }else{
                    console.log("SUCCESSFULLY LOGGED IN")
                    navigate("/")
                }
            }
            )
            )
            setLoad(false)
            
        }
    }
    

    return(
        <>
            {loader && <Loader/>}
            <div className="auth-container">
                <div className="auth-container--box">
                        <div className="tab-selector">
                            <NavLink exact to={"/login"}><h3>Login</h3></NavLink>
                            <NavLink exact to={"/signup"}><h3>Signup</h3></NavLink>
                        </div>
                        <form autoComplete={"on"} onSubmit={handleSubmission}>
                            <div className="input-wrap">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="text" 
                                    name="email" 
                                    placeholder="Enter Email" 
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="input-wrap">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="Enter Password" 
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="button-wrap">
                                <button className="login-btn">
                                    {type==="/login"?"Login":"Sign Up"}
                                </button>
                            </div>
                        </form>
                    </div>
            </div>
        </>
    )
}

export default AuthIndex;