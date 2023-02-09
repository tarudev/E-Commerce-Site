import { useEffect, useState } from "react"
import ListItem from "./ListItems/ListItem"
import axios from "axios"
import Loader from "../UI/Loader"
import { useParams,useNavigate,useLocation } from "react-router-dom"

const Products = () => {
    const [items, setItems] = useState([])
    const [loader, setLoader] = useState(true)
    const params = useParams()
    const history = useNavigate()
    const {search} = useLocation()
    const query = new URLSearchParams(search).get("search")


    useEffect(() => {
        async function fetchItems() {
            try {
                let temp='items.json'
                if(params.category){
                    temp=`items-${params.category}.json`
                }
                if(query){
                    temp+=`?search=${query}`
                }

                const response = await axios.get(`https://item-base-default-rtdb.firebaseio.com/${temp}`)
                const data = response.data

                if(!data){
                    history("/404")
                    return;
                }

                const transformedData = data.map((item, index) => {
                    return {
                        ...item,
                        id: index
                    }
                })
                // setLoader(false)
                setItems(transformedData)   
            } 
            catch (error) {
                // setLoader(false)
                // console.log("Error: ", error)
                // alert("Some error occurred");
            }
            finally {
                setLoader(false)
            }
        }

        fetchItems();

        return ()=>{
            setItems([])
            setLoader(true)
        }

    }, [params.category,query])



    return (
        <>
        <div className={"product-list"}>
            <div className={"product-list--wrapper"}>
                {/* <ListItem data={items[0]}></ListItem>
                <ListItem data={items[1]}></ListItem> */}
                {
                    items.map(item => {
                        return (<ListItem key={item.id} data={item}/>)
                    })
                }
                {/* {[<ListItem data={item[0]}/>,<ListItem data={item[1]}/>,<ListItem data={item[3]}/>]} */}
            </div>
        </div>
        { loader && <Loader/>}
        </>
    )
}

export default Products