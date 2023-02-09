import Products from "./components/Products/Products";
import Header from "./components/Layout/Header"
import Subheader from "./components/Layout/Subheader";
import { Route,Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import AuthIndex from "./components/Auth";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { checkLogin } from "./actions/auth";

const App = () => {

  // const [cartItems, setCartItems] = useState([])
  // const [eventQueue, setEventQueue] = useState({
  //   id: "",
  //   type: ""
  // })

  // const handleAddItem = item => {
  //   let items = [...cartItems]
  //   let index = items.findIndex(i => i.id === item.id)
  //   if(index > -1) {
  //     items[index] = item
  //   }
  //   else {
  //     items.push(item)
  //   }
  //   setCartItems([...items])
  //   // setCartItems(cartItems + 1)
  // }

  // const handleRemoveItem = item => {
  //   let items = [...cartItems]
  //   let index = items.findIndex(i => i.id === item.id)
  //   if(items[index].quantity === 0) {
  //     items.splice(index, 1)
  //   }
  //   else {
  //     items[index] = item
  //   }
  //   setCartItems([...items])
  //   // setCartItems(cartItems - 1)
  // }

  // // type === -1, decrease
  // // type === 1, increase
  // const handleEventQueue = (id, type) => {
  //   setEventQueue({
  //     id,
  //     type
  //   })
  // }

  const dispatch=useDispatch();
  const authState=useSelector(state=>state.auth)

  useEffect(()=>{
    dispatch(checkLogin(()=>{}))
  },[])

  return (
    <div>
      <Header />
      <Subheader/>
      <Routes>
        { 
          !authState.idToken && 
          <>
            <Route exact path={"/login"} element={<AuthIndex/>}/>
            <Route exact path={"/signup"} element={<AuthIndex/>}/>
          </>
        }
        <Route exact path={"/:category?"} element={<Products/>}/>
        <Route exact path={"/404"} element={<NotFound/>}/>
      </Routes>
        
    </div>
  );
}

export default App;
