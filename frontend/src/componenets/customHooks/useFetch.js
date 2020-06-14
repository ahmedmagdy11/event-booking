import { useState, useEffect, useContext } from 'react'
    
import AuthContext from "../../context/authContext"
const useFetch = (url,query,created) => {
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
                setData({data :resData , loading:false})
               
            }
        }
        f();
        
    },[url,created])
    console.log(data)
    return data
}

export default useFetch