import { useState, useEffect, useContext } from 'react'
    
import AuthContext from "../../context/authContext"
const useFetch = (url,query) => {
    const {authData , setAuthData} = useContext(AuthContext);
    const [data, setData] = useState({ data: null, loading: true });
    useEffect(() => {
        const f = async () => {
    
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'Authorization' : `Bearer ${authData.token}`
                },
                body: JSON.stringify(query)
            });
            if (response.ok){
                const resData = await response.json();
                console.log("resdata ", resData)
                setData({data :resData , loading:false})
               
            }
        }
        f();
        
    },[url])
    console.log(data)
    return data
}

export default useFetch